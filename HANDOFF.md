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

## Design task for this session: use `inspo-mcp`

The user wants design inspiration pulled in via **`inspo-mcp`**, a real,
MIT-licensed MCP server (`github.com/Nutlope/inspo`) exposing 15 tools:
search real-site designs, design systems, color palettes, reference
components, page flows, and recommendations.

Status from the prior session: it was registered as a **local stdio** MCP
server (works with no network access, unlike its hosted URL variant which
hits `https://inspomcp.dev/api/mcp` — that domain is blocked by this
sandbox's egress proxy, so stick to local stdio):

```bash
claude mcp add --scope user inspo -- npx -y inspo-mcp
```

This was run successfully (`File modified: /root/.claude.json`), but the
session running at the time couldn't pick up the new tools without a
restart. **This new session should have `inspo`'s tools available** — look
for them (e.g. via ToolSearch with a query like "inspo design search") and
confirm they're connected before using them.

**What to do with it**: pull design inspiration (palettes, layout
patterns, component ideas — hospitality/resort-appropriate) from
`inspo-mcp` and consider applying improvements to Mapple View Resort's
visual design, without breaking any existing functionality. Current design
system to compare against:

- Palette: forest green family (`#2f5233` primary, darker `#1a301f`/`#10200f`
  for depth), gold accent (`#c48c2a` family), cream background (`#faf6ef`) —
  all defined in `src/app/globals.css`.
- Typography: Playfair Display (serif, headings) + Inter (body) via
  `next/font/google`, see `src/app/layout.tsx`.
- Hero uses hand-drawn inline SVG mountain art (`src/components/site/MountainArt.tsx`)
  rather than photos, since no real resort photography exists yet —
  admins can upload real photos later via the room image uploader.

Report back to the user with concrete before/after suggestions (or just
apply improvements directly if the direction is clear) rather than
open-ended "here's what I found."

## Suggested next steps

1. Confirm the repo state matches this file's description (`git log`,
   `git status`).
2. Confirm `inspo-mcp` tools are connected; pull relevant design
   inspiration for a resort/hospitality site.
3. Apply any design improvements — keep the booking flow, admin panel, and
   all functionality intact; this is a visual/UX pass, not a rebuild.
4. Once GitHub write access is restored, push `claude/clever-dijkstra-egffzv`
   and let the user know.
