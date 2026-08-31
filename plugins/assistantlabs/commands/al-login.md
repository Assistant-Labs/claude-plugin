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

**Give them exactly this, and nothing else on the screen with it.** Three
numbered steps, one link, one thing to paste. No explanation of what a connector
is, no permission list, no mention of OAuth, MCP or a directory — those are our
words, not theirs.

> **Three steps, about two minutes.**
>
> **1.** Open **[claude.ai/customize/connectors](https://claude.ai/customize/connectors)**
>
> **2.** Click **+**, then **Add custom connector**
>
> **3.** Paste this in and click **Add**:
>
> ```
> https://mcp-server-150134556021.us-central1.run.app/mcp
> ```
>
> It'll ask you to sign in — that's your normal Assistant Labs login. Tick what
> you want me running, then come back here and say **done**.

**In Hebrew, use this — do not translate the block above on the fly.** The UI
labels stay in English because that is what is on their screen:

> **שלושה צעדים, בערך שתי דקות.**
>
> **1.** פתחו את **[claude.ai/customize/connectors](https://claude.ai/customize/connectors)**
>
> **2.** לחצו על **+** ואז על **Add custom connector**
>
> **3.** הדביקו את הכתובת הזאת ולחצו **Add**:
>
> ```
> https://mcp-server-150134556021.us-central1.run.app/mcp
> ```
>
> יבקשו מכם להתחבר. זה החשבון הרגיל שלכם ב-Assistant Labs. סמנו מה אתם רוצים
> שאני אריץ, תחזרו לכאן ותכתבו **סיימתי**.

Rules that keep it that small:

- **All three at once.** Drip-feeding one step per message doubles the length
  and makes a two-minute job feel like a process.
- **The URL alone on its own line**, in a code block, so it is one clean copy.
- **Say how long it takes** — "about two minutes" is the difference between
  doing it now and doing it later.
- **Never say "find Assistant Labs in the list."** It is not in the connector
  directory; there is nothing to find, and sending somebody looking for it is
  the worst thing this command can do.
- **Do not pre-explain the permissions.** If they ask, answer properly — one
  plain line each, and say which ones reach real customers. Otherwise the
  consent screen speaks for itself.
- **Leave nothing hanging.** Tell them what happens when they come back, in the
  same breath: you check it yourself and go straight to their business.

**On Team or Enterprise** an owner does it once for everybody, under
Organization settings → Connectors → Add → Custom → Web, and each person then
connects from their own Connectors page. Only mention this if they say they are
on a team plan or the personal route is unavailable to them.

**That one URL is everything.** The board, the CRM, Sales and Marketing all
come through the same address now — what appears is decided by what they ticked
on the consent screen, not by adding more connectors. **Never ask anybody to
paste a second URL.**

## When they come back

**Probe, do not ask.** Call `list_assistants`. If it answers, say who they are
and move — never make them prove it worked.

If it still does not answer, the likeliest cause is the plainest one: the
**Add** did not go through, or the sign-in was left half-finished. Say that in
one line and offer to walk step 3 again. Do not theorise, and do not send them
somewhere new.

## Testing against a local stack

**Only when the person says they are running one.** Never guess this from a repo
or a hostname — pointing a real business at somebody's laptop would fail
silently and look like our outage.

Both hosts move together; the tunnel serves the API and the MCP from one domain:

| | Production | Local (ngrok) |
|---|---|---|
| Connector URL | `https://mcp-server-150134556021.us-central1.run.app/mcp` | `https://assistantlabs.ngrok.app/mcp/mcp` |
| `A=` in the terminal flow below | `https://server-150134556021.us-central1.run.app` | `https://assistantlabs.ngrok.app/server` |

**Confirm it is up before sending anybody anywhere** — a tunnel that is down
answers nothing, and the failure looks like a broken sign-in:

```bash
curl -s https://assistantlabs.ngrok.app/mcp/.well-known/oauth-protected-resource
```

It should name the same host back and list the scopes the build actually
supports. **A scope missing from that list is not granted no matter what you
ask for** — that is how you tell a stale local server from a wrong request.

**A local server writes to PRODUCTION data.** There is no sandbox behind it: an
agent created against a local stack is a real agent on a real account, spending
a real seat. Say so before creating anything, and delete what a test leaves
behind.

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
  --data-urlencode "scope=agent:read agent:write agent:create agent:train threads:read threads:write contacts:read contacts:write channels:read segments:read segments:write integrations:read memory:read memory:write operator:read operator:notify followups:read followups:write followups:activate messages:send channel:send tasks:read tasks:write crm:companies:read crm:contacts:read crm:activities:read crm:schema:read crm:companies:write crm:contacts:write crm:activities:write sales:groups:read sales:journeys:read sales:audience:read sales:templates:read sales:groups:write sales:journeys:write sales:conversations:read sales:journeys:activate offline_access"
echo "client_id=$C"
```

**If that call fails on the network, stop and use the connector route.** It
means this surface is sandboxed, and it will not start working.

**Step 2 — give them the link.** `verification_uri_complete`, as a plain
clickable URL on its own line, with one sentence:

> "Open this and sign in — tick what you want me running, and I'll carry on from
> here by myself."

In Hebrew:

> "פתחו את הקישור והתחברו. סמנו מה אתם רוצים שאני אריץ, ואני ממשיך מכאן לבד."

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
