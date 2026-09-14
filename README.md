# Mapple View Resort

A resort website with an integrated booking system and a separate admin panel, built with Next.js, TypeScript, Tailwind CSS, and a self-contained SQLite database (no external database service required).

## Features

- **Public website** — home, rooms & suites, about, contact, all driven by content you manage in the admin panel.
- **Booking flow** — a guest picks a room and dates, enters their name/phone/email, sees a UPI QR code (generated from the UPI ID you configure), and clicks **"I've Paid — Confirm Booking"**.
- **WhatsApp notification** — on confirm, the booking is sent to the owner's WhatsApp number (configured in admin). If a WhatsApp Cloud API token is configured, it's sent automatically server-side; otherwise the guest's browser opens a pre-filled WhatsApp message to the owner as a fallback.
- **Admin panel** (`/admin`, login-protected, separate from the live site) — manage rooms (with image upload), view and update bookings, and configure resort info, UPI payment details, and WhatsApp settings.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file and set a real session secret:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   - `SESSION_SECRET` — a long random string (required in production; used to sign admin login sessions).
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD` — the first admin account. If left unset, a default `admin` / `changeme123` account is created on first run — **change the password immediately** from Admin → Settings after logging in.

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) for the website and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

The database is a single SQLite file created automatically at `data/mapple.db` the first time the app runs, seeded with sample rooms and default settings.

## Configuring payments & WhatsApp (Admin → Settings)

- **UPI Payment**: enter your UPI ID (VPA), e.g. `yourresort@okicici`, and the payee name. A QR code is generated on the fly for each booking using the exact amount due — any UPI app can scan it to pay.
- **WhatsApp Notifications**: enter the owner's WhatsApp number (with country code, e.g. `919876543210`). This is all that's required for the fallback flow (the guest's device opens WhatsApp with the booking details pre-filled, ready to send).
  - Optionally, for fully automatic server-side sending, configure a **WhatsApp Cloud API Access Token** and **Phone Number ID** from a [Meta WhatsApp Business API](https://developers.facebook.com/docs/whatsapp/cloud-api) app. Note Meta's messaging window rules apply to freeform business-initiated messages — the fallback link always works regardless.

## Project Structure

- `src/app/(site)/…` — public website pages (served at `/`, `/rooms`, `/about`, `/contact`, `/booking/[id]`).
- `src/app/admin/…` — admin panel (`/admin/login` is public; everything else under `/admin` requires login).
- `src/app/api/…` — API routes for bookings (public) and admin management (protected).
- `src/lib/db.ts` — SQLite connection, schema, and seed data.
- `src/lib/models.ts` — typed data access (Rooms, Bookings, Settings).
- `src/lib/upi.ts` / `src/lib/whatsapp.ts` — UPI QR generation and WhatsApp message/link building.
- `src/proxy.ts` — protects `/admin` and `/api/admin/*` routes, redirecting unauthenticated requests to login.

## Building for production

```bash
npm run build
npm run start
```

Deploy anywhere that runs a persistent Node.js server (a VPS, Docker container, Railway, Render, etc.) so the SQLite file and uploaded room images persist on disk. This app is **not** suited to a stateless/serverless host (like Vercel's default deployment) since the local SQLite database and `public/uploads` folder need a writable, persistent filesystem.

## Notes

- Room images are uploaded to `public/uploads` and referenced by URL; back up this folder along with `data/mapple.db`.
- Change the default admin password immediately after your first deploy.
