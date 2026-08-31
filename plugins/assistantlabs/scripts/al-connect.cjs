#!/usr/bin/env node
/**
 * Assistant Labs — connect.
 *
 * Signs the operator in without anybody visiting a settings menu.
 *
 * The problem this solves: on every surface that is not a local terminal, the
 * client and the browser are different machines. An OAuth redirect has nowhere
 * to land, so the plugin cannot complete a sign-in and the best it could ever
 * do was tell somebody to go and find Settings → Connectors, then wait to be
 * told they were done. That is not a connection flow, it is an instruction.
 *
 * RFC 8628 removes the redirect entirely: ask for a code, open a link, poll for
 * the answer. Nothing to paste, nothing to type, and the session learns the
 * outcome by itself.
 *
 * Prints progress on stderr for a human, and one JSON object on stdout for the
 * command that called it.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');

const DEFAULT_BASE = 'https://mcp-server-150134556021.us-central1.run.app';
const CLIENT_NAME = 'Assistant Labs operator (Claude)';

/**
 * Every scope the four modules can use, asked for as one request.
 *
 * Asking wide and letting the consent screen narrow is deliberate: the screen
 * can only offer what was requested, so a short ask would quietly remove the
 * CRM and Sales from the picker and there would be no way to tell from here
 * that it had happened. Mirrors AL_MODULES in
 * packages/types/src/apps/assistantlabs/oauth.ts — keep the two in step.
 */
const REQUESTED_SCOPES = [
	'agent:read', 'agent:write', 'agent:train',
	'threads:read', 'threads:write',
	'contacts:read', 'contacts:write',
	'channels:read', 'segments:read', 'segments:write', 'integrations:read',
	'memory:read', 'memory:write',
	'operator:read', 'operator:notify',
	'followups:read', 'followups:write', 'followups:activate',
	'messages:send', 'channel:send',
	'tasks:read', 'tasks:write',
	'crm:companies:read', 'crm:contacts:read', 'crm:activities:read',
	'crm:schema:read', 'crm:companies:write', 'crm:contacts:write',
	'crm:activities:write',
	'sales:groups:read', 'sales:journeys:read', 'sales:audience:read',
	'sales:templates:read', 'sales:groups:write', 'sales:journeys:write',
	'sales:conversations:read', 'sales:journeys:activate',
	'offline_access',
];

const credentialsPath = () =>
	path.join(os.homedir(), '.assistantlabs', 'credentials.json');

const say = msg => process.stderr.write(`${msg}\n`);

const readStore = () => {
	try {
		return JSON.parse(fs.readFileSync(credentialsPath(), 'utf8')) || {};
	} catch {
		return {};
	}
};

/**
 * Writes the credential file with owner-only permissions.
 *
 * `mode` on write only applies when the file is created, so the chmod is not
 * redundant: a file that already existed with looser permissions would keep
 * them, and a refresh token is worth exactly as much as a password.
 */
const writeStore = store => {
	const file = credentialsPath();
	fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
	fs.writeFileSync(file, `${JSON.stringify(store, null, 2)}\n`, { mode: 0o600 });
	try {
		fs.chmodSync(file, 0o600);
	} catch {
		// A filesystem without POSIX modes is not a reason to fail the sign-in.
	}
};

const postForm = async (url, params) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(params).toString(),
	});
	const text = await res.text();
	let body;
	try {
		body = JSON.parse(text);
	} catch {
		body = { error: 'invalid_response', error_description: text.slice(0, 200) };
	}
	return { status: res.status, body };
};

const getJson = async url => {
	const res = await fetch(url, { headers: { accept: 'application/json' } });
	if (!res.ok) throw new Error(`${url} answered ${res.status}`);
	return res.json();
};

/** Opens the browser, and shrugs if it cannot. */
const openBrowser = url => {
	const cmd =
		process.platform === 'darwin'
			? ['open', [url]]
			: process.platform === 'win32'
				? ['cmd', ['/c', 'start', '', url]]
				: ['xdg-open', [url]];
	return new Promise(resolve => {
		try {
			execFile(cmd[0], cmd[1], err => resolve(!err));
		} catch {
			resolve(false);
		}
	});
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
	const base = (
		process.env.CLAUDE_PLUGIN_OPTION_MCP_BASE_URL || DEFAULT_BASE
	).replace(/\/+$/, '');

	// 1. Discovery. The resource says who issues its tokens; the issuer says
	//    where to register, authorize and exchange. Nothing is hard-coded, so a
	//    staging deployment works with no change here.
	const resourceMeta = await getJson(
		`${base}/.well-known/oauth-protected-resource/mcp`,
	);
	const issuer = (resourceMeta.authorization_servers || [])[0];
	if (!issuer) throw new Error('The MCP server did not name an authorization server.');
	const as = await getJson(`${issuer}/.well-known/oauth-authorization-server`);
	if (!as.device_authorization_endpoint) {
		throw new Error(
			'This Assistant Labs deployment does not support the device grant yet. ' +
				'Update the server, or connect from Settings → Connectors.',
		);
	}

	// 2. Register once and remember it. A fresh client per sign-in would litter
	//    the account with a new "connected app" every time somebody reconnected.
	const store = readStore();
	const entry = store[base] || {};
	let clientId = entry.clientId;
	if (!clientId) {
		const reg = await fetch(as.registration_endpoint, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				client_name: CLIENT_NAME,
				client_uri: 'https://assistantlabs.io',
				grant_types: ['authorization_code', 'refresh_token'],
				response_types: ['code'],
				token_endpoint_auth_method: 'none',
				// Unused by the device grant, but RFC 7591 wants the array present.
				redirect_uris: ['urn:ietf:params:oauth:grant-type:device_code'],
			}),
		});
		if (!reg.ok) throw new Error(`Could not register: ${reg.status} ${await reg.text()}`);
		clientId = (await reg.json()).client_id;
	}

	// 3. Ask for a device code.
	const started = await postForm(as.device_authorization_endpoint, {
		client_id: clientId,
		scope: REQUESTED_SCOPES.join(' '),
	});
	if (started.status !== 200) {
		throw new Error(
			`Could not start sign-in: ${started.body.error_description || started.body.error}`,
		);
	}
	const {
		device_code: deviceCode,
		user_code: userCode,
		verification_uri_complete: completeUri,
		verification_uri: uri,
		interval,
		expires_in: expiresIn,
	} = started.body;

	const opened = await openBrowser(completeUri);
	say(opened ? 'Opened your browser.' : 'Open this to sign in:');
	say(completeUri);

	// 4. Poll. `authorization_pending` is the ordinary answer while somebody is
	//    reading the consent screen — it is a status, not a failure.
	const deadline = Date.now() + (expiresIn || 900) * 1000;
	let waitMs = Math.max(1, interval || 3) * 1000;
	while (Date.now() < deadline) {
		await sleep(waitMs);
		const poll = await postForm(as.token_endpoint, {
			grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
			device_code: deviceCode,
			client_id: clientId,
		});
		if (poll.status === 200) {
			const now = Date.now();
			store[base] = {
				clientId,
				issuer,
				accessToken: poll.body.access_token,
				refreshToken: poll.body.refresh_token,
				expiresAt: now + (poll.body.expires_in || 3600) * 1000,
				scopes: (poll.body.scope || '').split(' ').filter(Boolean),
				tokenEndpoint: as.token_endpoint,
				updatedAt: now,
			};
			writeStore(store);
			process.stdout.write(
				`${JSON.stringify({
					connected: true,
					scopes: store[base].scopes,
					// Which products the person actually ticked, inferred from the
					// scopes they came back with — the consent screen is the authority
					// on this, not what we asked for.
					modules: {
						agents: store[base].scopes.some(s => s.startsWith('agent:')),
						tasks: store[base].scopes.some(s => s.startsWith('tasks:')),
						crm: store[base].scopes.some(s => s.startsWith('crm:')),
						sales: store[base].scopes.some(s => s.startsWith('sales:')),
					},
				})}\n`,
			);
			say('Connected.');
			return;
		}

		const err = poll.body.error;
		if (err === 'authorization_pending') continue;
		// The server asks us to back off; obey it rather than hammering on.
		if (err === 'slow_down') {
			waitMs += 2000;
			continue;
		}
		if (err === 'access_denied') {
			process.stdout.write(`${JSON.stringify({ connected: false, reason: 'declined' })}\n`);
			say('Declined in the browser. Nothing was granted.');
			process.exit(0);
		}
		if (err === 'expired_token') break;
		throw new Error(poll.body.error_description || err || 'Sign-in failed.');
	}

	process.stdout.write(
		`${JSON.stringify({ connected: false, reason: 'timeout', userCode, verificationUri: uri })}\n`,
	);
	say('The sign-in window expired before it was approved.');
	process.exit(0);
}

main().catch(err => {
	process.stdout.write(
		`${JSON.stringify({ connected: false, reason: 'error', message: err.message })}\n`,
	);
	say(`Could not connect: ${err.message}`);
	process.exit(1);
});
