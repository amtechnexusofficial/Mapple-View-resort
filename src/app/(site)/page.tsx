import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { MountainHero, MountainDivider, ContourLines } from "@/components/site/MountainArt";
import RoomCard from "@/components/site/RoomCard";
import FeaturedRoomCard from "@/components/site/FeaturedRoomCard";
import Reveal from "@/components/site/Reveal";
import { RoomModel, SettingsModel } from "@/lib/models";

const highlights = [
  { title: "Scenic Mountain Views", desc: "Wake up to breathtaking valley and mountain vistas every morning." },
  { title: "Free Wi-Fi", desc: "Stay connected throughout your stay with complimentary high-speed internet." },
  { title: "Secure UPI Payments", desc: "Pay securely for your booking directly via UPI, fast and hassle-free." },
  { title: "Instant Confirmation", desc: "Your booking request reaches us instantly via WhatsApp for a quick response." },
];

const steps = [
  { n: "01", title: "Choose Room & Dates", desc: "Browse our rooms and pick your check-in and check-out dates." },
  { n: "02", title: "Share Your Details", desc: "Tell us your name and phone number so we can reach you." },
  { n: "03", title: "Pay via UPI", desc: "Scan the QR code and complete your payment in seconds." },
  { n: "04", title: "Get Confirmed", desc: "We're notified instantly on WhatsApp and confirm your stay." },
];

export default async function HomePage() {
  const [settings, allRooms] = await Promise.all([
    SettingsModel.get(),
    RoomModel.all(),
  ]);
  const rooms = allRooms.slice(0, 3);
  const [featuredRoom, ...otherRooms] = rooms;

  return (
    <div>
      <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden text-stone">
        <MountainHero />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-32 sm:px-6 sm:pb-28 sm:pt-40">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-petrol-300">
            {settings.resort_name}
          </span>
          <h1 className="mt-5 max-w-2xl font-display text-5xl font-medium leading-[1.05] sm:text-7xl lg:text-8xl">
            {settings.tagline || "Your Mountain Escape Awaits"}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone/75 sm:text-lg">
            {settings.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <LinkButton href="/rooms" variant="accent">
              Explore Rooms
            </LinkButton>
            <Link
              href="/contact"
              className="text-sm font-medium text-stone/80 underline decoration-stone/30 underline-offset-4 transition hover:text-stone hover:decoration-stone/70"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-petrol-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-petrol-600">
              Why Stay With Us
            </span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] text-ink sm:text-4xl">
              Details we&apos;ve thought through, so you don&apos;t have to.
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <div className="divide-y divide-petrol-100 border-t border-petrol-100">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delayMs={i * 80}>
                  <div className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-10">
                    <span className="font-mono-data text-sm text-petrol-500 sm:w-8 sm:shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl font-medium text-ink sm:w-56 sm:shrink-0">
                      {h.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink/70">{h.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {rooms.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-petrol-600">
                Accommodation
              </span>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
                Our Rooms &amp; Suites
              </h2>
            </div>
            <LinkButton href="/rooms" variant="outline">
              View All Rooms
            </LinkButton>
          </Reveal>
          <div className="mt-14">
            {featuredRoom && (
              <Reveal delayMs={100}>
                <FeaturedRoomCard room={featuredRoom} />
              </Reveal>
            )}
            {otherRooms.length > 0 && (
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {otherRooms.map((room, i) => (
                  <Reveal key={room.id} delayMs={150 + i * 80}>
                    <RoomCard room={room} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="relative bg-charcoal text-stone">
        <MountainDivider className="absolute -top-1 h-10 w-full text-ink sm:h-16" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="text-center">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-petrol-400">
              Booking Made Easy
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
              Book Your Stay in 4 Simple Steps
            </h2>
          </Reveal>
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-stone/15 sm:block" />
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.n} delayMs={i * 100}>
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-petrol-500 font-mono-data text-sm font-semibold text-stone">
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone/70">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <ContourLines
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full text-petrol-300"
          opacity={0.25}
        />
        <Reveal className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <h2 className="font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            Ready for Your Mountain Getaway?
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink/70">
            Reserve your room today and let us take care of the rest. Secure payment, instant confirmation, unforgettable memories.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkButton href="/rooms" variant="primary">
              Book Now
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
