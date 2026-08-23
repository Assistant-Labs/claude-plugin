#!/usr/bin/env node
/**
 * Every screen the plugin offers, and every tool it names, must actually exist.
 *
 * This is not a style check. The plugin's whole approach to UI is "never
 * rebuild a screen the product already has, link to the real one" — which
 * trades a maintenance burden for a coupling: rename a route in the app and the
 * operator starts handing customers 404s, confidently, with no error anywhere.
 * The same goes for a tool name in a skill that no longer matches the registry.
 *
 * Skips itself when the monorepo is not around it, so a standalone checkout of
 * the plugin still runs its other tests.
 *
 *     node --test plugins/assistantlabs/tests/
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const PLUGIN = path.join(__dirname, '..');
const REPO = path.join(PLUGIN, '..', '..');
const ROUTES = path.join(
	REPO,
	'apps/agents/frontend/src/const/routes.const.ts',
);
const APP_ROUTES = path.join(
	REPO,
	'apps/agents/frontend/src/routes/AppRoutes.tsx',
);
const MCP_TOOLS = path.join(REPO, 'apps/mcp-server/src');

const haveRepo = fs.existsSync(ROUTES) && fs.existsSync(MCP_TOOLS);

/** Every file the plugin ships that a model actually reads. */
const pluginDocs = () => {
	const out = [];
	const walk = dir => {
		if (!fs.existsSync(dir)) return;
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) walk(full);
			else if (/\.(md|json)$/.test(entry.name)) out.push(full);
		}
	};
	for (const d of ['skills', 'commands', 'agents']) walk(path.join(PLUGIN, d));
	return out;
};

const readAll = files => files.map(f => fs.readFileSync(f, 'utf8')).join('\n');

/** `:assistantId` and `${assistantId}` are the same slot. */
const normalise = route =>
	route.replace(/\$\{[a-zA-Z]+\}/g, ':X').replace(/:[a-zA-Z]+/g, ':X');

const walkFiles = (dir, test) => {
	const out = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walkFiles(full, test));
		else if (test(entry.name)) out.push(full);
	}
	return out;
};

describe('the plugin only points at things that exist', { skip: !haveRepo }, () => {
	test('every /app screen it links to is a real route', () => {
		const docs = readAll(pluginDocs());
		const linked = new Set(
			(docs.match(/\/app\/[a-zA-Z0-9:/_-]+/g) ?? [])
				.map(r => r.replace(/[.,)]+$/, ''))
				.map(normalise),
		);

		// Two sources, because the app declares routes in both places: the enum
		// and the builders in routes.const.ts, plus nested `path:` segments in
		// AppRoutes.tsx that never appear in the enum at all.
		const constSrc = fs.readFileSync(ROUTES, 'utf8');
		const appSrc = fs.readFileSync(APP_ROUTES, 'utf8');

		const declared = new Set(
			(constSrc.match(/\/app\/[a-zA-Z0-9:/_${}-]+/g) ?? []).map(normalise),
		);

		// Nested children are declared as bare segments — `path: 'follow-ups'`
		// under a parent that IS in the enum. Collected separately rather than
		// cross-multiplied with every parent, which is both wrong (it would
		// accept `/app/billing/follow-ups`) and combinatorially explosive.
		const nested = new Set();
		for (const seg of appSrc.match(/path: '([a-zA-Z0-9:/_-]+)'/g) ?? []) {
			const value = seg.slice(7, -1);
			if (value.startsWith('/app')) declared.add(normalise(value));
			else nested.add(normalise(value));
		}

		const exists = route => {
			if (declared.has(route)) return true;
			// A child of something declared, e.g. `<Settings>` + `follow-ups`.
			for (const parent of declared) {
				if (!route.startsWith(`${parent}/`)) continue;
				if (nested.has(route.slice(parent.length + 1))) return true;
			}
			return false;
		};

		const missing = [...linked].filter(r => !exists(r)).sort();
		assert.deepStrictEqual(
			missing,
			[],
			`The plugin links to screens the app does not serve:\n  ${missing.join('\n  ')}\n` +
				'Fix the link in the skill — do not add a route to make the doc true.',
		);
	});

	test('every tool it names is registered on the MCP server', () => {
		const registered = new Set();
		for (const file of walkFiles(MCP_TOOLS, n => n.endsWith('.ts'))) {
			const src = fs.readFileSync(file, 'utf8');
			for (const m of src.match(/name: '[a-z_]+'/g) ?? []) {
				registered.add(m.slice(7, -1));
			}
		}
		assert.ok(registered.size > 20, 'found suspiciously few registered tools');

		// Anything snake_case in the docs is either a tool name or a config key.
		// The known non-tools are listed rather than pattern-matched, so a NEW
		// unknown name fails loudly instead of being explained away.
		const NOT_TOOLS = new Set(['mcp_base_url']);
		const named = new Set(
			(readAll(pluginDocs()).match(/\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b/g) ?? [])
				.filter(n => !NOT_TOOLS.has(n)),
		);

		const unknown = [...named].filter(n => !registered.has(n)).sort();
		assert.deepStrictEqual(
			unknown,
			[],
			`The plugin names tools that are not registered:\n  ${unknown.join('\n  ')}`,
		);
	});
});
