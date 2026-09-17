import { LinkButton } from "@/components/ui/Button";
import { MountainHero, MountainDivider, ContourLines } from "@/components/site/MountainArt";
import RoomCard from "@/components/site/RoomCard";
import FeaturedRoomCard from "@/components/site/FeaturedRoomCard";
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
      <section className="relative isolate overflow-hidden text-stone">
        <MountainHero />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-24">
          <span className="rounded-full bg-stone/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-petrol-400 ring-1 ring-petrol-400/40">
            Welcome to {settings.resort_name}
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-none tracking-tighter sm:text-6xl lg:text-7xl">
            {settings.tagline || "Your Mountain Escape Awaits"}
          </h1>
          <p className="mt-6 max-w-xl text-base text-stone/80 sm:text-lg">
            {settings.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/rooms" variant="accent">
              Explore Rooms
            </LinkButton>
            <LinkButton href="/contact" variant="outline" className="border-stone/40 text-stone hover:bg-stone/10">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="border-b border-petrol-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="text-sm font-semibold uppercase tracking-widest text-petrol-600">
              Why Stay With Us
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              Details we&apos;ve thought through, so you don&apos;t have to.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-petrol-100 border-t border-petrol-100">
              {highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="font-mono-data text-sm text-petrol-500 sm:w-8 sm:shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink sm:w-56 sm:shrink-0">
                    {h.title}
                  </h3>
                  <p className="text-sm text-ink/70">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {rooms.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-petrol-600">
                Accommodation
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
                Our Rooms &amp; Suites
              </h2>
            </div>
            <LinkButton href="/rooms" variant="outline">
              View All Rooms
            </LinkButton>
          </div>
          <div className="mt-10">
            {featuredRoom && <FeaturedRoomCard room={featuredRoom} />}
            {otherRooms.length > 0 && (
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {otherRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="relative bg-charcoal text-stone">
        <MountainDivider className="absolute -top-1 h-10 w-full text-ink sm:h-16" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-petrol-400">
              Booking Made Easy
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Book Your Stay in 4 Simple Steps
            </h2>
          </div>
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-stone/15 sm:block" />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n}>
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-petrol-500 font-mono-data text-sm font-semibold text-stone">
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone/70">{s.desc}</p>
                </div>
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
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold leading-none tracking-tighter text-ink sm:text-4xl">
            Ready for Your Mountain Getaway?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/70">
            Reserve your room today and let us take care of the rest. Secure payment, instant confirmation, unforgettable memories.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LinkButton href="/rooms" variant="primary">
              Book Now
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
