# Group View Counts for Discourse

[![Discourse Theme CI](https://github.com/mamenein/discourse-group-view-counts/actions/workflows/discourse-theme.yml/badge.svg)](https://github.com/mamenein/discourse-group-view-counts/actions/workflows/discourse-theme.yml)

A [Discourse](https://www.discourse.org/) theme component that shows **topic
view counts** and **post read counts** only to the **groups you choose**.
The default is the **moderators** group.

Also available in [German](README.de.md).

## Why this exists

Some themes (for example **Air** and **Horizon**) do not show view counts.
Discourse still counts views in the background. Our moderators wanted to see
how often a topic was read, without showing that number to every member.

Existing components such as
[Post Views Counter](https://meta.discourse.org/t/post-views-counter/143807)
show the count to everyone. This component adds one thing: **you decide which
groups see it**.

We are releasing it as open source under the MIT license. Use it, fork it,
improve it.

## Features

- **Group-gated** — a group picker in the admin settings; default: moderators
- **Server-side membership check** on current Discourse
  (`resolve_group_membership`): the browser gets only "yes" or "no", never the
  group list
- Client-side fallback for older Discourse versions
- **Topic view count** on the topic page, at an outlet you choose
- Optional **post read count** next to each post date
- Anonymous visitors never see counts
- English and German translations, with correct plurals
- Theme component only — no backend plugin, no API keys

## Requirements

- Discourse **3.3.0** or newer
- Post read counts need the Glimmer post stream (the default on current
  Discourse). On older versions, only the topic view count shows.

## Installation

1. Go to **Admin → Appearance → Themes and components → Install →
   From a git repository**
2. Paste: `https://github.com/mamenein/discourse-group-view-counts`
3. Click **Install**, then add the component to your active theme(s)
   (**Components** tab of the theme → **Add a component**)

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `visible_to_groups` | moderators | Groups that see the counts. |
| `show_topic_views` | on | Show the topic view count on the topic page. |
| `topic_views_outlet` | `topic-above-post-stream` | Where the topic count appears. Also: `topic-title-suffix`, `topic-above-posts`, `topic-area-bottom`. |
| `show_post_reads` | off | Show the read count on every post, next to the date. |

**Admins are not in the moderators group.** If admins must see the counts
too, add the `admins` group (or use `staff`, which means admins and
moderators).

## What the numbers mean

- **Topic views** — Discourse's `views` for the topic (the same number that the
  classic "Views" column shows).
- **Post reads** — Discourse's `reads` for the post: how many users read it.

## Privacy note

This component hides the numbers in the interface. **It does not remove them
from the data that Discourse sends to the browser.** Topic `views` and post
`reads` are part of the normal topic JSON, so a technical user can still find
them. For view counts this is usually fine. If the numbers must be truly
secret, you need a server plugin.

## Testing

1. Log in as a moderator. Open a topic. The view count shows.
2. Log in as a normal member. Open the same topic. No count shows.
3. Log out. No count shows.
4. Change `visible_to_groups`. Reload. Check again.

Check desktop and mobile, and preview on your theme (Air, Horizon, …) before
you use it on a live forum.

## Development

```sh
pnpm install
pnpm lint
```

Unit tests for the visibility rules are in `test/javascripts/unit`. Run them
with the Discourse theme CLI or the CI workflow.

## License

MIT — see [LICENSE](LICENSE).
