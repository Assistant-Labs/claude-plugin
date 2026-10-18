---
name: build-a-crm
description: >
  Turning a business's description of how it works — a spec, a "master prompt",
  a spreadsheet, a conversation — into a working AssistantLabs CRM: its own kinds
  of record (units, contracts, clinics, deals, quotes…), the links between them,
  calculated fields, rules, tasks, automations, roles, dashboards and imported
  data. Use for "build me a CRM for…", "set up our CRM from this document",
  "add serial-number tracking", "remind us before contracts end", or any request
  that changes how the CRM is structured rather than what is in it.
---

# Building a CRM from a description

The business describes how it works; you turn that into the CRM's own
structure, in the product, where their team uses it every day. **You never
build a separate app or a spreadsheet next to the CRM** — every requirement
below has a home in it, and anything you leave outside it is something only you
can maintain.

## First: read it as a model, not as screens

A spec arrives as screens ("a dashboard with four windows", "a lead card with
these 25 fields"). Underneath there are always the same few things. Write them
down before touching anything:

1. **The nouns** — what the business keeps. Each becomes a **record type**:
   clinics, products, units (one per serial number), contracts, payments,
   deals, deliveries, service calls. People and companies already exist in the
   CRM (contacts, companies) — do not make a record type for them.
2. **The links** — which noun points at which. A unit points at its product; a
   contract at its client and its units; a payment at its contract. Each is a
   `relation` field on the side that holds ONE of the other (the contract holds
   its client, not the client holding its contracts — the client's page lists
   them automatically).
3. **The lifecycles** — every `status` with its values in order, and which
   moves are allowed (`transitions`). "A rented unit returns to stock only
   after inspection" is a transition rule, not a process somebody remembers.
4. **The invariants** — what must never happen. Two records with one serial
   number → `unique`. A unit on two active contracts → `relation.exclusive`
   with `whenField: status, whenValues: [active states]`. A contract with no
   client → `required`.
5. **What is worked out, not typed** — end dates, days left, totals paid,
   balances, VAT, commissions → `formula` and `rollup` fields. Never ask the
   team to type a number the CRM can compute.
6. **The routine** — "when X, do Y" and "N days before Z, remind W" →
   automations. Every reminder in the spec is a date trigger ("N days before");
   every "when a lead comes in, create a task" is a "record created" trigger. One
   automation is a whole journey: its steps mix tasks, record updates, a
   WhatsApp template and emails to the customer, with a `delay` (a wait) before
   any step — "new lead → WhatsApp now, wait a day, call task". "When a company
   churns" is an automation with `subject: "company"`.
7. **Who sees what** → roles (sales, inventory, finance, logistics, view-only).
8. **The numbers management wants** → dashboards.

Read `describe_crm_field_types` once before you start — it is the vocabulary.

## Then build, in this order

The order matters because links and rollups can only name things that exist.

1. `list_record_types` — see what is there. **Extend, never duplicate.**
2. `create_record_type` for each noun — **the ones others link to first**
   (clients and products before units, units before contracts, contracts
   before payments). Give each a one-line `description`. Plain fields can go in
   now.
3. `upsert_record_field` for the links, then the rollups (a rollup needs the
   link on the other side first), then formulas that read rollups.
4. Rules on the fields: `required`, `unique`, `transitions`,
   `relation.exclusive`, `defaultValue` (`{today}`, `{me}`).
5. `set_crm_navbar` — tabs in the order the team works: home, the pipeline,
   clients, the inventory, contracts, tasks, dashboard, settings last. Types
   only reached through links (payments) can stay out of the bar.
6. `set_page_design` per type (`rt:<id>`): the list page (board by status for a
   pipeline, table with filters for inventory, metrics on top) and the record
   page (details, then linked records, tasks, history) — following **Make it
   beautiful** below, not the bare default.
7. Automations: `create_crm_automation` → `test_crm_automation` on a real record
   → `set_crm_automation_enabled`. They are created switched off on purpose.
   WhatsApp and email steps send only when the workspace's sending is live; the
   dry run shows what each would send, to whom, and how long after the trigger.
8. Roles and dashboards — see the tools below.
9. Data: import their spreadsheets rather than retyping them (dry run first).

## Make it beautiful

Once the schema exists, finish every type so its pages read at a glance. Read
`describe_page_blocks` first: `recordPage` lists the cards and presets, `look`
the closed sets of colours and icons — a name outside them is refused.

1. **Appearance** — per type, an icon and a colour that say what it is
   (contracts `file` teal, units `box` blue, service calls `wrench` orange,
   payments `coins` green, clinics `stethoscope` purple):
   `set_page_design` with `appearance: {icon, color}`.
2. **Status pills** — every status-like select gets `optionColors`
   (`upsert_record_field`): green = good/active, amber = waiting, red = a
   problem, blue = in progress, gray = done/inactive. A contract: טיוטה gray,
   ממתין לחתימה amber, פעיל green, הסתיים gray.
3. **Warning numbers** — `toneRules` on deadlines and balances: days left
   `lt 0` red then `lt 30` amber; a balance `gt 0` orange. First match wins.
4. **Progress** — `progressOf` on paid-vs-total pairs: the paid rollup draws
   as a bar towards the contract value.
5. **Record page** (`recordPage` in `set_page_design`):
   - preset `herosplit`; `aurora` (bold coloured banner) for the one or two
     types the business lives in (contracts, deals).
   - identity card `fields` = the status select (it becomes the pill beside
     the title) + 2-4 key facts (client, unit, end date).
   - one `stats` card with the 2-4 numbers people open the record for (value,
     paid, balance, days left) — they may repeat fields shown elsewhere.
   - `fieldGroup` cards by subject (תנאים, כספים, אספקה), each with an `icon`;
     `cols: 2` for short fields; `emphasis` on the one number a card is about.
   - one `related` card per linked type, narrowed with `relatedType` (and
     `relatedVia` when two links point here), each with its own title and
     icon — "תשלומים" with `coins`, "מכשירים" with `box`.
   - `tasks` and `history` in the side column.
6. **List page** (`mainPage`): metrics on top (count, sums, what is overdue);
   a board grouped by status wherever there is a pipeline; a table with
   filters for inventory.
7. **Money** — a currency field with no `unit` shows the workspace currency;
   set it once with `set_crm_currency` (ILS for an Israeli business).

Tint one or two cards on a page, not all of them — colour that is everywhere
says nothing. Read the result back with `get_page_design` before telling the
owner it is done.

## Values, the way a person writes them

Write values as a person would and let the CRM normalise them: a link takes the
linked record's **title** ("פיזיו חיפה"), a team-member field an **email or
name**, dates `YYYY-MM-DD` or `DD/MM/YYYY`, amounts "1,250". A refusal comes
back as a sentence naming every problem (a duplicate serial number, a unit
already on contract K-1001) — fix them and retry; never retry with `force`
unless the owner asked to override that rule.

## What the spec says that is NOT a structure question

- "Don't invent data / show demo numbers as real" — create sample records only
  if the owner asks for them, title them clearly as samples, and delete them
  before real data arrives.
- "The design must be beautiful" — that is the page designer's presets, not a
  new app.
- "AI assistant inside the CRM" — that already exists (the CRM agent, and you).
- A spec written for a developer ("React, PostgreSQL, build the app") is still a
  CRM configuration request. Say plainly that you are configuring their
  AssistantLabs CRM, not writing software, and what that gives them.

## Before you finish

- Walk one real case end to end — the spec's own process ("new lead → demo →
  quote → signed rental → unit delivered"): create the records, move the
  statuses, and check the units, tasks and totals came out right.
- Tell the owner what you built in their words (the tabs they will see, the
  rules that now hold, the reminders that will fire), what is switched off and
  waiting for them, and what the product does not do yet. Write it into the
  `stack` memory page.

## Tools

Structure: `describe_crm_field_types`, `list_record_types`,
`create_record_type`, `update_record_type`, `upsert_record_field`,
`get_crm_navbar`, `set_crm_navbar`, `list_design_targets`, `get_page_design`,
`set_page_design`, `describe_page_blocks`, `set_crm_currency`.

Records: `find_records`, `search_all_records`, `get_record`,
`get_record_history`, `create_record`, `update_record`,
`link_contacts_to_record`, `list_crm_team_members`.

Tasks: `list_crm_tasks`, `create_crm_task`, `update_crm_task`.

Automations: `list_crm_automations`, `create_crm_automation`,
`update_crm_automation`, `test_crm_automation`, `set_crm_automation_enabled`,
`list_crm_automation_runs`.

Numbers: `list_crm_report_sources`, `run_crm_report`, `list_crm_dashboards`,
`save_crm_dashboard`. A manager's dashboard is usually: new leads this month,
leads by source, conversion by source (measure `percent`), the pipeline as a
funnel, income by month, revenue per rep, inventory by status, open tasks per
person.

Roles: `get_crm_roles`, `save_crm_role`, `assign_crm_role`. Typical roles:
sales (writes leads and deals, reads inventory, never sees purchase cost),
inventory (writes units and deliveries), finance (payments and contracts),
view only (`defaultAccess: read`). Admins bypass roles; a member with no role
keeps full member access, so defining a role changes nothing until someone is
put in it.

Data in and out: `suggest_crm_import_mapping`, `import_crm_records` (always a
dry run first — read every row's result, fix, then run with dryRun false),
`export_crm_records`, `attach_crm_file`, `get_crm_file_link`. Import the types
others link to first, exactly as when building them (clinics before units,
units before contracts), so link columns resolve by title.

Other systems: `list_crm_webhooks`, `create_crm_webhook`, `test_crm_webhook`,
`update_crm_webhook` — for "send it to our accounting / Make / Zapier".
Webhooks are created off and switch on after a successful test.

Changing structure, roles, dashboards and automations needs the connection of a
workspace ADMIN; a member's connection is refused with a sentence saying so.
