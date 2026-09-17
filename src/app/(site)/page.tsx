import { LinkButton } from "@/components/ui/Button";
import { MountainHero, MountainDivider } from "@/components/site/MountainArt";
import RoomCard from "@/components/site/RoomCard";
import { RoomModel, SettingsModel } from "@/lib/models";

const highlights = [
  { title: "Scenic Mountain Views", desc: "Wake up to breathtaking valley and mountain vistas every morning." },
  { title: "Free Wi-Fi", desc: "Stay connected throughout your stay with complimentary high-speed internet." },
  { title: "Secure UPI Payments", desc: "Pay securely for your booking directly via UPI — fast and hassle-free." },
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

  return (
    <div>
      <section className="relative isolate overflow-hidden text-cream">
        <MountainHero />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start px-4 py-28 sm:px-6 sm:py-36">
          <span className="rounded-full bg-cream/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-400 ring-1 ring-gold-400/40">
            Welcome to {settings.resort_name}
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            {settings.tagline || "Your Mountain Escape Awaits"}
          </h1>
          <p className="mt-6 max-w-xl text-base text-cream/80 sm:text-lg">
            {settings.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/rooms" variant="gold">
              Explore Rooms
            </LinkButton>
            <LinkButton href="/contact" variant="outline" className="border-cream/40 text-cream hover:bg-cream/10">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="border-b border-forest-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title}>
              <div className="h-1 w-10 rounded-full bg-gold-500" />
              <h3 className="mt-4 font-display text-lg font-semibold text-forest-800">
                {h.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {rooms.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-gold-600">
                Accommodation
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-forest-800 sm:text-4xl">
                Our Rooms &amp; Suites
              </h2>
            </div>
            <LinkButton href="/rooms" variant="outline">
              View All Rooms
            </LinkButton>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      <section className="relative bg-forest-900 text-cream">
        <MountainDivider className="absolute -top-1 h-10 w-full text-forest-900 sm:h-16" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
              Booking Made Easy
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Book Your Stay in 4 Simple Steps
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl bg-forest-800/60 p-6 ring-1 ring-forest-700">
                <span className="font-display text-3xl font-bold text-gold-400">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-cream/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold text-forest-800 sm:text-4xl">
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
      </section>
    </div>
  );
}
