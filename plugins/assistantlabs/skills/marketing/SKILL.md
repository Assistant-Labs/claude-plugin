---
name: marketing
description: >
  The Marketing product, end to end — social posts, messaging campaigns (email
  and WhatsApp templates in one journey) and the email templates they are
  written from, the brand kit and media library,
  Instagram comment-and-DM automations, Meta ads, and the strategy, research and
  product profile behind all of it. What can be drafted freely, the four moments
  that stop for the owner (publish, send, switch on, spend), which permission
  each one needs, and how to tell what actually went out. Use for "write a
  post", "send a newsletter", "email my customers", "WhatsApp my customers a
  promotion", "who read / replied to the campaign", "make an email template",
  "reply to everyone who comments", "run an ad", "how did the post do", "change
  our logo or colours", or anything about the marketing plan.
---

# Marketing

Everything here is built in two halves on purpose: **a draft, and the moment it
goes out.** A post is written, then published. A campaign is built, then
launched. An automation is saved, then switched on. An ad is created, pushed to
Meta paused, then switched on. The first half is yours. The second half is the
owner's, every time.

So the work is never "shall I start on a newsletter?". It is the finished
newsletter, the exact audience with its number, and one question.

## Start here

```
get_marketing_overview     connected social accounts, recent posts, what needs attention
get_product_profile        what the business sells, its prices, what makes it different
get_strategy               the goals, the audience, the channels, the ad budget rules
get_brand_kit              logo, colours, typefaces, voice, tagline
```

**Read the profile and the strategy before writing a word.** They are the
business's own answers to "who is this for and what are we trying to do" — a
post that ignores them is a guess with good grammar. If the profile is thin, fill
it from their website and what you know (`update_product_profile`) and say so in
the next report; that is 🟡.

**Where a post can go is `list_social_channels`** (or the overview above).
`list_channels` answers for the *agent* — WhatsApp, email, website chat — which
is a different question. An account whose connection has expired is skipped
when publishing until somebody reconnects it in the app.

## The four moments that stop

| Moment | Tool | Why it stops |
|---|---|---|
| A post goes public | `publish_post`, `retry_failed_channels` | the public sees it, under the business's name, and it cannot be recalled from here |
| A message reaches an inbox or a phone | `launch_email_campaign`, `resume_email_campaign`, and both test sends | real people, no recall — and every WhatsApp marketing message is charged to the business |
| A rule starts answering people | `create_instagram_automation` or `update_instagram_automation` with `enabled: true` | it replies and DMs on its own from the next comment |
| Money starts leaving | `activate_ad` — and `launch_ad`, which puts the ad on their Meta account | it spends the daily budget until someone pauses it |

All four are 🔴 (see `autonomy-and-approvals`): the owner sees the exact thing —
the caption and the picture, the email or the WhatsApp message and the audience count, the rule's
trigger and its reply, the ad with its budget and targeting — and says yes to
that one. **An away owner gets a task with the finished artefact in it, never
the send.**

**Stopping something is never gated.** `pause_email_campaign` and `pause_ad`
are the brakes. If a campaign is going to the wrong people or an ad is burning
money, pause first and explain second.

**Everything else is drafting, and drafting is 🟢.** Do not ask permission to
write.

## Posts

```
draft_post        one post, saved as a draft — nothing goes out
edit_post         change it while it is still a draft
list_posts        every post, with where it went and where it failed
get_post          one post in full, a row per account
publish_post      🔴 real and public
get_performance   how posts and accounts are doing
```

- **Write one post, once.** The caption is fitted to each network when it
  publishes; do not write four versions.
- **A picture comes from the media library** (`list_media`), or is brought in
  from a public link with `add_media_from_url`. Use the library's own link for
  it, not the original one. There is no tool that invents an image.
- **Publishing reports per account, and a mixed result is normal.** Say which
  accounts took it and which did not, in words. `retry_failed_channels` tries
  only the ones that failed — it is still a publish, so it still asks.
- **A post cannot be edited once it is live anywhere.** Get the words right
  before the yes.
- **Numbers a network does not report are missing, not zero.** Never turn a
  blank into "0 views". `refresh_performance` asks the networks again when they
  want the very latest.

**No account connected yet?** `list_importable_channels` lists the Facebook
Pages and Instagram accounts already on their agent; `import_channels` adds them
with no sign-in at all. YouTube, TikTok, or Instagram on its own need a person
in a browser — `get_channel_connect_link` returns the link to hand over. If
those tools are not there, the owner connects accounts themselves at
`https://marketing.assistantlabs.io/settings/channels`.

## Messaging campaigns — email and WhatsApp

A campaign is a short journey: a message, a wait, maybe a check on what the
person did, another message. Each message is either an **email** (through the
email channel of the agent the workspace is connected to) or a **WhatsApp
template** (from that agent's WhatsApp number). Mix them freely — "WhatsApp
first, an email two days later to whoever has not read it" is one campaign.
The app calls this tab **Messaging**; the tool names still say "email" because
they are older than WhatsApp.

```
list_email_campaigns              every campaign, its numbers — and whether email and WhatsApp can go out at all
list_campaign_whatsapp_templates  the agent's WhatsApp templates, approved first — the only thing a WhatsApp step can send
create_email_campaign             a draft: name, audience, steps
update_email_campaign             change any of them
preview_email_audience            how many people, per channel, with a sample — before saving
get_email_campaign                the whole thing, its per-step numbers, and `problems`
launch_email_campaign             🔴
pause_email_campaign              the brake
list_email_campaign_recipients    who got each message, who read / opened, clicked, replied — and what they said
```

**WhatsApp is templates only — never free text.** A campaign reaches people who
have not written in, and outside a 24-hour window WhatsApp delivers nothing but
a template the business got approved. Build the step from
`list_campaign_whatsapp_templates`: copy the template's name, language and
`template` fields, and fill its blanks (`variables`). If there is no approved
template that says what the owner wants, say so — creating and approving one is
a separate job on the agent's WhatsApp channel, and it takes Meta time.

**Build it in this order, and do not skip the second step.**

1. **Can it go out?** `list_email_campaigns` says whether the agent has a
   working email channel (`channel`) and a connected WhatsApp number
   (`whatsapp`). A campaign only needs the channels its steps use. If one is
   missing, nothing on it can send — the link is the agent's channel page in
   `opening-the-app`.
2. **Who, exactly?** `preview_email_audience` with the campaign's `channels`
   before anything else. An audience is contacts with any of the chosen labels,
   optionally only those who agreed to marketing, CRM records, plus anyone
   added by hand (addresses in `extraEmails`, numbers with their country code in
   `extraPhones`). **No labels means every contact the campaign can reach** —
   say that number out loud before the owner finds out the hard way. The
   preview's `reachable` says how many each channel reaches: someone with only
   an email skips the WhatsApp steps, someone with only a phone skips the
   emails. People who unsubscribed or opted out are already left out.
3. **What does it say?** Write the steps. Start each email from a template
   (below) rather than from nothing. Fill a WhatsApp template's blanks with the
   person's fields — `{{firstName|there}}`, always with a fallback, because a
   blank WhatsApp value is refused. A web address in a blank becomes each
   person's own tracked short link, so a tap counts as a click.
4. **Is it ready?** `get_email_campaign` returns `problems` — what stops it
   from launching, in words (a template not chosen, a blank not filled, a
   channel not connected). Empty means ready. Launching with problems is
   refused, so read them instead of trying.
5. **One test, to the owner.** `send_campaign_test_email` sends one step: an
   email step to an address (marked as a test), a WhatsApp step to a phone
   number. It is still a message from the business: it asks.
6. **The yes.** Put it to the owner as one decision — *"Send 'Spring sale' to
   412 people now? A WhatsApp message goes to the 380 with a phone straight
   away, and two days later an email to whoever has not read it. WhatsApp
   charges you for each marketing message it delivers."* Then
   `launch_email_campaign`.

**Launching is immediate.** Everyone in the audience is enrolled and the first
message leaves at once. There is no "schedule for Tuesday" on the launch — a
wait belongs on a step.

**WhatsApp costs money per message.** Meta charges the business for every
marketing template it delivers. That makes a WhatsApp campaign's launch a money
decision as well as a sending one: say the number of WhatsApp messages in the
yes, every time.

**Did they agree to hear from the business?** A list nobody consented to is not
an audience (see `growth-and-leads`). When the owner is not sure, use only the
contacts marked as agreed, and say why the number is smaller. On WhatsApp this
is not only manners — numbers that block or report a business get its account
limited.

**A running campaign can be edited.** People already past a step do not get it
again; people who have not reached it get the new version. That makes an edit
to a live campaign a change to what customers receive — show it first.

**Checks** ask about one earlier message: did they **open** it (on WhatsApp:
read it — the blue ticks), **click** a link in it, or **reply** to it (WhatsApp
only). A click or a reply proves it was read, so someone with read receipts
switched off still counts once they act.

**Report what happened, per message and per person.** For each message:
sent, delivered (WhatsApp), opened or read, clicked, replied (WhatsApp),
passed over — `get_email_campaign` (`stepStats`) for the totals,
`list_email_campaign_recipients` for who, including the words of each reply.
A reply is a conversation with the agent from then on — if the owner should
see someone's answer, say who and what they said. "It went out" is not a
report. Email opens are approximate (some inboxes hide them); WhatsApp reads
need read receipts on; clicks and replies are exact.

**To send a finished campaign again**, `duplicate_email_campaign` makes a fresh
draft. It launches like any other: with a yes.

## Email templates

Templates live in Studio. Each is a designed email filed under a category and
tags, and a campaign email takes a **copy** of one — editing a template later
never changes a campaign that is already going out.

```
get_email_design_catalog    the styles, the blocks, the ready-made starters, the brand
list_email_templates        what they already have
create_email_template       a new one
update_email_template       change it
send_email_template_test    🔴 one test, to one address
```

**Call `get_email_design_catalog` before building one.** It returns the five
styles (clean, bold, elegant, playful, minimal), the block types and their
fields, and every starter — sale, launch, newsletter, welcome, event, thank-you
— as finished content to adapt.

**The look comes from the brand kit, not from the template.** A template
chooses a style and which brand colour leads. It never carries a colour code or
a logo of its own, so every template changes together when the brand does.
This is the thing to tell the owner, in one sentence, the first time: *"Your
emails use the logo and colours from your brand kit — change them there once and
every template follows."*

- **Wrong colours or no logo in an email is a brand-kit fix**, not a template
  fix. `get_brand_kit`, then `update_brand_kit`; a new logo goes in first with
  `upload_brand_asset_from_url`.
- **Keep it short.** A heading, a few lines, one picture, one button. One email,
  one thing to do. The templates make it hard to be ugly; they cannot stop an
  email from being long.
- **Category and tags are how the owner finds it again.** Set both.

Changing the brand kit changes how every email and piece of creative looks from
then on. It is the business's face: show the owner the before and after and get
the yes, unless they asked for exactly that change.

## Instagram automations

A rule that watches comments or messages on a connected Instagram account and
answers — the usual one is *"comment GUIDE and I'll DM you the link"*.

```
list_instagram_accounts              is Instagram actually delivering to us?
list_instagram_posts / list_instagram_comments   what people really write
preview_instagram_automation         a dry run — nothing is sent
create_instagram_automation          save it switched OFF
update_instagram_automation          🔴 `enabled: true` is what starts it
get_instagram_automation_activity    what it answered, and what failed
```

- **Check the account is ready first.** `list_instagram_accounts` says whether
  comments and messages are reaching us. If not, a rule can be perfect and never
  fire — `enable_instagram_automation_delivery` switches delivery on.
- **Read the real comments before choosing keywords.** People write "guide pls",
  "GUIDE!!", "מדריך". A rule tuned to what you imagined they write answers
  nobody.
- **Always dry-run.** `preview_instagram_automation` says whether a given
  comment would fire the rule, and why not.
- **Save it off. Show it. Then switch it on.** The owner sees the trigger and
  the exact reply, in their language, and says yes. From that moment it answers
  strangers in public with nobody reading each reply.
- **Look at the activity the next day** and report what it sent and what failed.

## Ads

Small Meta ads, most often one that opens a WhatsApp chat with the business.

```
get_ads_connection          which ad account, Page and WhatsApp number — or nothing connected
list_ads / get_ad           what exists, and its state
search_ad_interests         Meta's own targeting interests
list_ad_whatsapp_numbers    where a click-to-WhatsApp ad lands
create_ad / update_ad       a draft — nothing on Meta, nothing spent
launch_ad                   🔴 creates it on Meta, PAUSED
activate_ad                 🔴 switches it on — this is the spend
pause_ad                    the brake
```

- **No ad account connected is a browser step.** Connecting Meta Ads needs the
  owner to sign in: `https://marketing.assistantlabs.io/settings/ads`.
- **The strategy carries the budget rules.** Read them before proposing a
  budget, and propose a number inside them.
- **Three states, and say which one an ad is in.** A draft exists only here. A
  launched ad is on Meta and paused. An active ad is spending. "I've set up
  your ad" means nothing unless it says which.
- **The approval names the money.** *"Switch on 'Spring sale' at ₪40 a day,
  women 25–45 within 15 km of Haifa, until you pause it?"* — never "shall I
  start the ad?".
- **`delete_ad` does not delete it on Meta.** An ad that is running keeps
  running in Ads Manager. Pause it first, then remove it.
- **An edit to an ad already on Meta is not live** until it is pushed again with
  `launch_ad`.

## The plan behind it

| | Read | Change |
|---|---|---|
| Strategy | `list_strategies`, `get_strategy` | `update_strategy_section`, `save_strategy_campaign`, `save_campaign_experiment` |
| Research | `get_research` | `save_research_finding`, `label_research_finding`, `dismiss_research_finding` |
| Product profile | `get_product_profile` | `update_product_profile` |

The strategy is the owner's thinking about their own business. Filling a gap
from what they told you is 🟡. **Changing a goal, the audience, the positioning
or the budget is theirs** — propose it, with the reason, and wait.

`set_strategy_section_autonomy` sets how much a section runs itself inside the
app. That is a standing permission, so it follows the standing-permission rule:
only when the owner says so, in those words.

When you learn something about their market — a competitor's price, what
customers keep asking for — `save_research_finding` puts it where the next
session and the app will both see it. A fact that stays in this chat is gone
tomorrow.

## Permissions — why a tool might be missing

The connection is granted in layers, and the four in bold are off unless the
owner ticks them on the sign-in screen:

| The owner ticked | You can |
|---|---|
| Read your marketing | see everything above |
| Draft marketing | write posts, campaigns, templates, ads; edit the strategy, research, brand kit and media |
| **Publish a post** | `publish_post` |
| **Send marketing email** | launch and resume campaigns, send tests |
| **Run Instagram automations** | create, edit and switch on rules |
| **Spend on ads** | `activate_ad` |

**A tool that is not there was not granted. It is not broken.** Do the whole
draft anyway, then say plainly: *"It's ready. I can't send it from here — either
press Launch on this page, or reconnect and tick 'Send marketing email'."* with
the link. Pressing the button themselves is a perfectly good way to run, and for
a first campaign it is the right one.

Never treat a missing permission as something to get around.

## Where it lives

`https://marketing.assistantlabs.io` — full table in `opening-the-app`.

| They want to see | Path |
|---|---|
| The post you drafted | `/social/posts` |
| The campaign, to read it or press Launch | `/messaging/<campaignId>` |
| A template in the editor | `/studio/email-templates/<templateId>` |
| The brand kit | `/studio/branding` |
| The automations and what they did | `/social/automations` · `/social/automations/activity` |
| The ads | `/ads` |
| Connect a social account | `/settings/channels` |

Most tools here return the link to the screen they changed. Hand that over
rather than building one.
