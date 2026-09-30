---
name: marketing
description: >
  The Marketing product, end to end — social posts, email campaigns and the
  email templates they are written from, the brand kit and media library,
  Instagram comment-and-DM automations, Meta ads, and the strategy, research and
  product profile behind all of it. What can be drafted freely, the four moments
  that stop for the owner (publish, send, switch on, spend), which permission
  each one needs, and how to tell what actually went out. Use for "write a
  post", "send a newsletter", "email my customers", "make an email template",
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
| Mail reaches an inbox | `launch_email_campaign`, `resume_email_campaign`, and both test sends | real people, no recall |
| A rule starts answering people | `create_instagram_automation` or `update_instagram_automation` with `enabled: true` | it replies and DMs on its own from the next comment |
| Money starts leaving | `activate_ad` — and `launch_ad`, which puts the ad on their Meta account | it spends the daily budget until someone pauses it |

All four are 🔴 (see `autonomy-and-approvals`): the owner sees the exact thing —
the caption and the picture, the email and the audience count, the rule's
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

## Email campaigns

A campaign is a short journey: an email, a wait, maybe a check on who opened or
clicked, another email. It goes out through the email channel of the agent the
workspace is connected to.

```
list_email_campaigns          every campaign, its numbers — and whether email can go out at all
create_email_campaign         a draft: name, audience, steps
update_email_campaign         change any of them
preview_email_audience        how many people, with a sample — before saving
get_email_campaign            the whole thing, and `problems`
launch_email_campaign         🔴
pause_email_campaign          the brake
list_email_campaign_recipients  what happened to each person
```

**Build it in this order, and do not skip the second step.**

1. **Can mail go out?** `list_email_campaigns` says whether the agent has a
   working email channel. If it does not, nothing below can send — the link is
   the agent's email channel page in `opening-the-app`.
2. **Who, exactly?** `preview_email_audience` before anything else. An audience
   is contacts with any of the chosen labels, optionally only those who agreed
   to marketing, plus any addresses added by hand. **No labels means every
   contact with an email address** — say that number out loud before the owner
   finds out the hard way. People who unsubscribed are already left out, and
   every email carries its own unsubscribe link.
3. **What does it say?** Write the steps. Start each email from a template
   (below) rather than from nothing.
4. **Is it ready?** `get_email_campaign` returns `problems` — what stops it
   from launching, in words. Empty means ready. Launching with problems is
   refused, so read them instead of trying.
5. **One test, to the owner.** `send_campaign_test_email` sends one step to one
   address, marked as a test. It is still mail from the business: it asks.
6. **The yes.** Put it to the owner as one decision — *"Send 'Spring sale' to
   412 people now? First email goes out immediately, the reminder three days
   later to whoever did not open."* Then `launch_email_campaign`.

**Launching is immediate.** Everyone in the audience is enrolled and the first
email leaves at once. There is no "schedule for Tuesday" on the launch — a wait
belongs on a step.

**Did they agree to hear from the business?** A list nobody consented to is not
an audience (see `growth-and-leads`). When the owner is not sure, use only the
contacts marked as agreed, and say why the number is smaller.

**A running campaign can be edited.** People already past a step do not get it
again; people who have not reached it get the new version. That makes an edit
to a live campaign a change to what customers receive — show it first.

**Report what happened, per step.** Sent, opened, clicked, unsubscribed —
`get_email_campaign` for the totals, `list_email_campaign_recipients` for who.
"It went out" is not a report.

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
| Strategy | `list_strategies`, `get_strategy` | `update_strategy_section`, `save_strategy_campaign`, `save_strategy_wedge` |
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
| The campaign, to read it or press Launch | `/email/<campaignId>` |
| A template in the editor | `/studio/email-templates/<templateId>` |
| The brand kit | `/studio/branding` |
| The automations and what they did | `/social/automations` · `/social/automations/activity` |
| The ads | `/ads` |
| Connect a social account | `/settings/channels` |

Most tools here return the link to the screen they changed. Hand that over
rather than building one.
