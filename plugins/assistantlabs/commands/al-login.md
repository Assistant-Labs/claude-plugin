---
description: Connect Assistant Labs — one link, and it picks up by itself
---

# Connect

**Probe first, silently.** Call `list_assistants`. If it answers they are already
connected: say who they are in one line and go straight on to `/al-setup`. Only
a call you just made is evidence — never a session notice, never a startup hook.

## The sign-in

This is plain HTTP, run inline. **Do not depend on a file in this plugin** —
hosted surfaces (claude.ai, Cowork) receive the content files and not the
`scripts/` directory, so a command that shells out to a bundled script works on
a terminal and fails everywhere else.

**Step 1 — start it.** One call, and keep `device_code` for the polling step:

```bash
A=https://server-150134556021.us-central1.run.app
C=$(curl -s -X POST "$A/oauth/register" -H 'content-type: application/json' \
  -d '{"client_name":"Assistant Labs operator","redirect_uris":["urn:ietf:params:oauth:grant-type:device_code"],"grant_types":["authorization_code","refresh_token"],"response_types":["code"],"token_endpoint_auth_method":"none"}' \
  | sed -n 's/.*"client_id":"\([^"]*\)".*/\1/p')
curl -s -X POST "$A/oauth/device_authorization" \
  --data-urlencode "client_id=$C" \
  --data-urlencode "scope=agent:read agent:write agent:train threads:read threads:write contacts:read contacts:write channels:read segments:read segments:write integrations:read memory:read memory:write operator:read operator:notify followups:read followups:write followups:activate messages:send channel:send tasks:read tasks:write crm:companies:read crm:contacts:read crm:activities:read crm:schema:read crm:companies:write crm:contacts:write crm:activities:write sales:groups:read sales:journeys:read sales:audience:read sales:templates:read sales:groups:write sales:journeys:write sales:conversations:read sales:journeys:activate offline_access"
echo "client_id=$C"
```

**Step 2 — give them the link.** `verification_uri_complete` from that response,
as a plain clickable URL on its own line. **Never tell them to open a browser
themselves or to find a settings menu** — the link is the whole instruction:

> "Open this and sign in — tick what you want me running, and I'll carry on from
> here by myself.
>
> https://assistantlabs.io/oauth/consent?request_id=…"

**Step 3 — wait for it.** Poll every ~4 seconds. `authorization_pending` is the
ordinary answer while they are reading the screen; it is a status, not a failure:

```bash
curl -s -X POST "$A/oauth/token" \
  --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:device_code" \
  --data-urlencode "device_code=$D" --data-urlencode "client_id=$C"
```

`slow_down` → wait longer. `access_denied` → they said no; take it, say nothing
was granted, stop. `expired_token` → offer to start again.

**Do not ask them to come back and confirm.** The polling is what tells you.

**Step 4 — store it**, so the connection can present it:

```bash
mkdir -p ~/.assistantlabs && chmod 700 ~/.assistantlabs
printf '{"accessToken":"%s","refreshToken":"%s","clientId":"%s","tokenEndpoint":"%s/oauth/token"}\n' \
  "$ACCESS" "$REFRESH" "$C" "$A" > ~/.assistantlabs/credentials.json
chmod 600 ~/.assistantlabs/credentials.json
```

**Step 5 — re-probe.** `list_assistants` should answer. The first call after a
sign-in may 401 once while the connection picks up the token; call again. That
is expected and is not a failure to report.

## If the tools stay dead after a successful sign-in

Then this surface does not run the connection's header helper, and the token on
disk cannot reach it. Say so plainly — do not keep retrying — and fall back:

**Settings → Connectors → Assistant Labs → Connect** on claude.ai, the desktop
app and Cowork. `/mcp` in a Claude Code terminal. Same consent screen, same
module picker; only the route differs.

**Report which one worked.** It is the open question about this surface, and the
answer changes the product.

## What they chose decides what happens next

The granted scopes are the real answer — the consent screen is the authority,
not what was asked for.

| Granted | What setup then owes them |
|---|---|
| `agent:*` | a live channel, and an agent that knows the business |
| `tasks:*` | the board, and a number to reach them on |
| `crm:*` | their companies and people imported |
| `sales:*` | Shopify connected, and a first journey |

**Never set up a module they did not tick.**

## Then earn it immediately

"Connected" is a status, not a result. Go straight to the business:

> "You're in — סוכן AssistantLabs. Give me your website and I'll read it so I
> actually know what you sell, or tell me in your own words."

**No API key, no password, nothing pasted into the chat.** If they offer one,
decline and point them back at the link.
