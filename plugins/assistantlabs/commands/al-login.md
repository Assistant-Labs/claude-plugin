---
description: Connect Assistant Labs — one link, and it picks up by itself
---

# Connect

**Probe first, silently.** Call `list_assistants`. If it answers they are already
connected: say who they are in one line and go straight on to `/al-setup`. Only
a call you just made is evidence — never a session notice, never a startup hook.

## Which route works depends entirely on the surface

There are two, and picking the wrong one wastes somebody's first five minutes.

**In a Claude Code terminal** the plugin can sign them in itself — see
§"Terminal" below.

**On claude.ai and Cowork it cannot, and no amount of retrying changes that.**
That sandbox ships no executables from a plugin, cannot open a browser on their
machine, and blocks outbound calls to our auth host. The connector is the only
route there. **Do not attempt the inline flow first to see** — a blocked network
call as somebody's opening experience is worse than going straight to the thing
that works.

## claude.ai and Cowork — the connector

**Assistant Labs is not in the connector directory yet.** There is no entry to
search for, so never tell anybody to look for one. It is added by URL:

> **Open [claude.ai/customize/connectors](https://claude.ai/customize/connectors),
> click **+** → **Add custom connector**, and paste this:**
>
> `https://mcp-server-150134556021.us-central1.run.app/mcp`
>
> Then **Add**, and sign in when it asks. Leave the advanced OAuth fields empty
> — it registers itself.

That lands on our own consent screen with the module picker: they tick what they
want running and nothing that reaches a real customer is on by default.

On **Team or Enterprise** an owner adds it once under Organization settings →
Connectors → Add → Custom → Web, and everybody else connects from their own
Connectors page.

Adding the board, Sales or the CRM is the same three clicks with
`/tasks/mcp`, `/sales/mcp` or `/crm/mcp` on the end. **Only offer those when
something actually needs them** — one connector is enough to be useful, and
three consent screens up front is the tax this whole command exists to avoid.

## Terminal — the plugin signs them in

Plain HTTP, run inline. **Never shell out to a file in this plugin** — hosted
surfaces do not receive the `scripts/` directory.

**Step 1 — start it**, and keep `device_code` for the polling step:

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

**If that call fails on the network, stop and use the connector route.** It
means this surface is sandboxed, and it will not start working.

**Step 2 — give them the link.** `verification_uri_complete`, as a plain
clickable URL on its own line, with one sentence:

> "Open this and sign in — tick what you want me running, and I'll carry on from
> here by myself."

**Step 3 — wait for it.** Poll every ~4 seconds. `authorization_pending` is the
ordinary answer while they read the screen; it is a status, not a failure:

```bash
curl -s -X POST "$A/oauth/token" \
  --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:device_code" \
  --data-urlencode "device_code=$D" --data-urlencode "client_id=$C"
```

`slow_down` → wait longer. `access_denied` → they said no; take it, say nothing
was granted, stop. `expired_token` → offer to start again. **Never ask them to
come back and confirm** — the polling is what tells you.

**Step 4 — store it:**

```bash
mkdir -p ~/.assistantlabs && chmod 700 ~/.assistantlabs
printf '{"accessToken":"%s","refreshToken":"%s","clientId":"%s","tokenEndpoint":"%s/oauth/token"}\n' \
  "$ACCESS" "$REFRESH" "$C" "$A" > ~/.assistantlabs/credentials.json
chmod 600 ~/.assistantlabs/credentials.json
```

**Step 5 — re-probe.** `list_assistants` should answer. The first call after a
sign-in may 401 once while the connection picks up the token; call again. That
is expected and is not a failure to report.

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
