# Handoff Notes — Mapple View Resort

Read this first in any new session working on this project.

## What this project is

A resort website with an integrated booking system and a separate admin
panel, for "Mapple View Resort". Full build already complete:

- **Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 +
  `better-sqlite3` (no ORM — Prisma was tried but the installed version was
  an unstable `8.0.0-rc` release, so hand-written SQL via `src/lib/db.ts` /
  `src/lib/models.ts` was used instead for reliability).
- **Public site** (`src/app/(site)/…`): home, rooms & suites listing +
  detail w/ booking form, about, contact, and the booking/payment flow at
  `/booking/[id]`.
- **Booking flow**: guest picks room + dates → enters name/phone/email →
  sees a UPI QR code (generated server-side from the admin-configured UPI
  ID via `src/lib/upi.ts`) → clicks "I've Paid — Confirm Booking" → the
  owner is notified on WhatsApp (`src/lib/whatsapp.ts`): automatically via
  WhatsApp Cloud API if the admin configured a token + phone number ID,
  otherwise a pre-filled `wa.me` link opens on the guest's device as a
  fallback.
- **Admin panel** (`src/app/admin/…`, protected by `src/proxy.ts` — Next 16
  renamed `middleware.ts` to `proxy.ts`): login, dashboard, rooms CRUD with
  image upload, bookings list/detail with status updates, and settings for
  resort info / UPI / WhatsApp config. Default login is `admin` /
  `changeme123` (seeded on first run if `ADMIN_USERNAME`/`ADMIN_PASSWORD`
  env vars aren't set) — **must be changed** after first real deploy.
- Fully tested end-to-end in a real browser (booking flow, QR generation,
  WhatsApp fallback link, admin login/dashboard/rooms/bookings/settings) —
  all confirmed working. See `README.md` for setup/run instructions.

## ⚠️ Unresolved: GitHub push access

Everything above is **committed locally** on branch
`claude/clever-dijkstra-egffzv` (commit as of last session: `ab5784e`) but
**could not be pushed to GitHub**. Both `git push` and the GitHub API
(`push_files`) returned the same 403:

> Claude doesn't have GitHub access to
> `amtechnexusofficial/Mapple-View-resort` for your organization
> (`Resource not accessible by integration`)

`get_me` / `list_branches` via the GitHub MCP tools work fine (read access
exists), confirming this is specifically a missing **write** grant. Fix
needed before anything can reach GitHub:

- Org admin installs/grants the Claude GitHub App:
  https://github.com/apps/claude/installations/select_target
- Or reconnect GitHub from claude.ai settings:
  https://claude.ai/customize/connectors?auth_start=github&auth_start_force=1

**If this new session starts from a fresh clone of the (still-empty)
GitHub repo, none of the work described above will be present on disk** —
it only exists in the previous session's container unless it was pushed.
Check `git log` first; if the repo looks empty, the work needs to be
redone or recovered from that earlier session before continuing.

## Design: `inspo-mcp` declined — redesign already drafted instead

The user **does not want `inspo-mcp`** used (explicitly declined it), so
don't pursue that server even though it may still be connected/available.

Instead, the user rejected the original design as looking too generic /
"AI-generated" (Playfair Display + Inter, forest-green/gold/cream, boxed
cards — a very templated look) and asked for something unique and
interactive. In response, two fully-designed, genuinely distinct
directions were drafted and published as a comparison Artifact:

**→ https://claude.ai/artifact/4qYti8EhEToaJHboEMUgkf ("Ridge & Maple")**

- **Direction A — "Contour"**: topographic/survey-map feel grounded in the
  resort's real elevation (2,005m) and coordinates. Bricolage Grotesque
  (display) + Newsreader (serif body) + IBM Plex Mono (data labels), warm
  parchment ground, rust-orange as the single accent. Interactive
  mouse-reactive contour-line canvas in the hero, animated elevation
  counter. Booking step styled as a "trail permit."
- **Direction B — "Maple"**: botanical/seasonal, leaning into the resort's
  actual name. Fraunces italic serif (display) + Schibsted Grotesk (body),
  deep maple-red/moss/amber palette. An interactive maple-leaf SVG that
  changes color and copy across Spring/Summer/Autumn/Winter buttons.
  Booking step styled as a wax-sealed "specimen card."

Both use the real room names/prices from the seeded data (Cozy Garden Room
₹3,000, Deluxe Valley View Room ₹4,500, Premium Mountain Suite ₹7,500) so
they're concrete, not abstract mockups.

**Status: awaiting the user's decision** (A, B, a mix of specific pieces
from each, or neither). If this new session doesn't already have that
answer from the user, ask for it before rebuilding anything — do not just
pick one. Once they decide, rebuild the actual site
(`src/app/globals.css`, `src/app/layout.tsx`, and the room/booking
components) to match the chosen direction's fonts/palette/layout, keeping
all existing functionality (booking flow, UPI QR, WhatsApp notify, admin
panel) intact — this is a visual/UX rebuild, not a functional one.

## Infra research done: Cloudflare + Neon (not yet implemented)

The user has Cloudflare and Neon accounts and wants to move off local
SQLite once the design is settled. Research already done (see prior
conversation) confirmed this is viable:

- **Hosting**: `@opennextjs/cloudflare` adapter — confirmed compatible
  with this project's Next.js version (16.3.5 satisfies its `>=16.2.11`
  requirement).
- **Database**: swap `better-sqlite3` for Neon's serverless driver
  (`@neondatabase/serverless`) — no connection pooling gateway needed.
- **Breaking change**: Cloudflare Workers has no persistent local disk, so
  `public/uploads` (room image uploads, currently written to local disk by
  `src/app/api/admin/upload/route.ts`) must move to **Cloudflare R2**
  instead.
- The whole `src/lib/db.ts` / `src/lib/models.ts` SQL layer needs
  rewriting for Postgres syntax (`?` → `$1` placeholders, `datetime('now')`
  → `now()`, etc.).
- Needs the user's Neon connection string and Cloudflare account
  credentials to actually deploy — don't invent these.

**Not started yet** — the user wanted the design finalized first. Tackle
this after the design rebuild is confirmed working, unless the user says
otherwise.

## MCP servers added this project (status varies)

- `inspo` — registered `--scope user` (available in any project), but
  **user doesn't want it used**. Ignore even if connected.
- `playwright` — registered at **project scope** (`claude mcp add
  playwright npx @playwright/mcp@latest`, no `--scope user`), so only
  available when working in this repo. Intended for browser-driving/visual
  QA of the site. This environment already has Chromium pre-installed
  system-wide (`PLAYWRIGHT_BROWSERS_PATH`/`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD`
  are set), so it should connect without needing a separate browser
  install step.

Both were registered by running `claude mcp add …` from within a running
session — this writes to `/root/.claude.json` in that session's
**container**, which may or may not be the same container this new
session gets. **First check whether these tools actually show up** (e.g.
ToolSearch for "playwright" / "inspo"); if they don't, the registration
didn't carry over and needs to be re-run (commands above) — takes seconds.

## Suggested next steps

1. Confirm the repo state matches this file's description (`git log`,
   `git status`) — if empty, the previous session's work needs recovering
   before continuing (see GitHub section above).
2. Get the user's design decision (A / B / mix) on the Ridge & Maple
   artifact if not already given.
3. Rebuild the site's visual layer to match — keep all functionality
   intact.
4. Once GitHub write access is restored, push `claude/clever-dijkstra-egffzv`.
5. After design is confirmed working, move to the Cloudflare + Neon
   migration described above.
