#!/usr/bin/env node
/**
 * Assistant Labs — connection headers.
 *
 * Claude Code runs this at connection time and again after any 401, and sends
 * whatever JSON it prints as headers. That retry is what makes the whole
 * sign-in feel like nothing happened: `/al-login` writes a token to disk, the
 * next tool call 401s once, this runs again, and the tools come alive without
 * anybody restarting anything.
 *
 * Prints `{}` when there is no token. An empty header set is the honest answer
 * — the server replies 401 and the session reports the tools as unavailable,
 * which is exactly true.
 *
 * NEVER prints the token anywhere but the header, and never logs it. stderr is
 * for people; the token is not for people.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const DEFAULT_BASE = 'https://mcp-server-150134556021.us-central1.run.app';

/** Refresh this far before expiry, so a call never races the clock. */
const REFRESH_SKEW_MS = 90 * 1000;

const credentialsPath = () =>
	path.join(os.homedir(), '.assistantlabs', 'credentials.json');

const emit = headers => {
	process.stdout.write(JSON.stringify(headers));
	process.exit(0);
};

const readStore = () => {
	try {
		return JSON.parse(fs.readFileSync(credentialsPath(), 'utf8')) || {};
	} catch {
		return {};
	}
};

const writeStore = store => {
	const file = credentialsPath();
	try {
		fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
		fs.writeFileSync(file, `${JSON.stringify(store, null, 2)}\n`, { mode: 0o600 });
		fs.chmodSync(file, 0o600);
	} catch {
		// A token that could not be persisted still works for this connection.
	}
};

async function main() {
	const base = (
		process.env.CLAUDE_PLUGIN_OPTION_MCP_BASE_URL || DEFAULT_BASE
	).replace(/\/+$/, '');

	const store = readStore();
	const entry = store[base];
	if (!entry?.accessToken) emit({});

	const fresh = entry.expiresAt && entry.expiresAt - REFRESH_SKEW_MS > Date.now();
	if (fresh) emit({ Authorization: `Bearer ${entry.accessToken}` });

	// Expired. Rotate it silently — a person should never be asked to sign in
	// again because an hour passed.
	if (!entry.refreshToken || !entry.tokenEndpoint) {
		emit({ Authorization: `Bearer ${entry.accessToken}` });
	}

	try {
		const res = await fetch(entry.tokenEndpoint, {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: entry.refreshToken,
				client_id: entry.clientId,
			}).toString(),
		});
		if (!res.ok) {
			// The refresh was refused — the grant was revoked, or the token was
			// rotated elsewhere. Send the stale one and let the server say 401:
			// deleting the entry here would turn a recoverable state into a silent
			// disconnection nobody could diagnose.
			emit({ Authorization: `Bearer ${entry.accessToken}` });
		}
		const body = await res.json();
		const now = Date.now();
		store[base] = {
			...entry,
			accessToken: body.access_token,
			refreshToken: body.refresh_token || entry.refreshToken,
			expiresAt: now + (body.expires_in || 3600) * 1000,
			updatedAt: now,
		};
		writeStore(store);
		emit({ Authorization: `Bearer ${body.access_token}` });
	} catch {
		emit({ Authorization: `Bearer ${entry.accessToken}` });
	}
}

// A ten-second budget is the documented ceiling; failing closed with no headers
// beats hanging the connection.
const guard = setTimeout(() => emit({}), 8000);
guard.unref?.();

main().catch(() => emit({}));
