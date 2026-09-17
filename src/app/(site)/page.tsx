import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import SectionLabel from "@/components/site/SectionLabel";
import { MountainHero, ContourLines } from "@/components/site/MountainArt";
import RoomCard from "@/components/site/RoomCard";
import FeaturedRoomCard from "@/components/site/FeaturedRoomCard";
import Reveal from "@/components/site/Reveal";
import { RoomModel, SettingsModel } from "@/lib/models";

const highlights = [
  {
    icon: "forest",
    title: "Scenic Mountain Views",
    desc: "Wake up to breathtaking valley and mountain vistas every morning.",
  },
  {
    icon: "wifi",
    title: "Free Wi-Fi",
    desc: "Stay connected throughout your stay with complimentary high-speed internet.",
  },
  {
    icon: "qr_code_2",
    title: "Secure UPI Payments",
    desc: "Pay securely for your booking directly via UPI, fast and hassle-free.",
  },
  {
    icon: "bolt",
    title: "Instant Confirmation",
    desc: "Your booking request reaches us instantly via WhatsApp for a quick response.",
  },
];

const steps = [
  { n: "01", title: "Choose Room & Dates", desc: "Browse our rooms and pick your check-in and check-out dates." },
  { n: "02", title: "Share Your Details", desc: "Tell us your name and phone number so we can reach you." },
  { n: "03", title: "Pay via UPI", desc: "Scan the QR code and complete your payment in seconds." },
  { n: "04", title: "Get Confirmed", desc: "We're notified instantly on WhatsApp and confirm your stay." },
];

const nearby = [
  {
    label: "Highest Summit",
    title: "Doddabetta Peak",
    desc: "At about 2,637m, the highest point in the Nilgiris, with sweeping views over the whole hill range on a clear day.",
  },
  {
    label: "World Heritage",
    title: "Nilgiri Mountain Railway",
    desc: "The UNESCO-listed narrow-gauge toy train winding through tunnels and tea gorges between Mettupalayam and Ooty.",
  },
  {
    label: "Established 1848",
    title: "Government Botanical Garden",
    desc: "Terraced Italian-style gardens with a fossilised tree trunk estimated at over 20 million years old.",
  },
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
      {/* ============================= HERO ============================= */}
      <section className="relative isolate flex min-h-[92vh] flex-col justify-between overflow-hidden text-stone">
        {settings.hero_image ? (
          <>
            <Image
              src={settings.hero_image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/15" />
          </>
        ) : (
          <MountainHero />
        )}

        <div className="label-caps relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-b border-stone/20 px-4 pt-8 pb-4 text-stone/80 sm:px-6">
          <span>11.41&deg; N, 76.70&deg; E &nbsp;&middot;&nbsp; ~2,200M ELEVATION</span>
          <span>LOVEDALE &middot; OOTY, NILGIRIS</span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <span className="label-caps text-petrol-300">{settings.resort_name}</span>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-normal leading-[1.05] sm:text-7xl lg:text-8xl">
            {settings.tagline || "Your Mountain Escape Awaits"}
          </h1>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-stone/80 sm:text-lg">
            {settings.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <LinkButton href="/rooms" variant="accent">
              Explore Rooms
            </LinkButton>
            <Link
              href="/contact"
              className="label-caps border border-stone/40 px-7 py-3.5 text-stone/90 transition hover:bg-stone hover:text-ink"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="label-caps relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pb-6 text-stone/60 sm:px-6">
          <span>Scroll to Discover</span>
          <Icon name="south" className="animate-bounce text-base" />
        </div>
      </section>

      {/* ========================= WHY STAY WITH US ========================= */}
      <section className="border-b border-petrol-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index="01" eyebrow="Sanctuary Ethos" />
            <h2 className="mt-5 font-display text-3xl font-normal leading-[1.1] text-ink sm:text-4xl">
              Details we&apos;ve thought through, so you don&apos;t have to.
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <div className="divide-y divide-petrol-100 border-t border-petrol-100">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delayMs={i * 80}>
                  <div className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:gap-10">
                    <Icon name={h.icon} className="text-2xl text-petrol-500 sm:w-8 sm:shrink-0" />
                    <h3 className="font-display text-xl font-medium text-ink sm:w-56 sm:shrink-0">
                      {h.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-ink/70">{h.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============================== ROOMS =============================== */}
      {rooms.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel index="02" eyebrow="Accommodation Portfolio" />
              <h2 className="mt-5 font-display text-4xl font-normal leading-[1.05] text-ink sm:text-5xl">
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
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
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

      {/* ========================= BOOKING IN 4 STEPS ========================= */}
      <section className="relative bg-charcoal text-stone">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="text-center">
            <SectionLabel index="03" eyebrow="Booking Made Easy" className="justify-center" />
            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.05] sm:text-5xl">
              Book Your Stay in 4 Simple Steps
            </h2>
          </Reveal>
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-stone/15 sm:block" />
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.n} delayMs={i * 100}>
                  <span className="label-caps relative z-10 flex h-10 w-10 items-center justify-center bg-petrol-500 text-stone">
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-stone/70">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= EXPLORE OOTY TEASER ========================= */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel index="04" eyebrow="Destination Compendium" />
            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.05] text-ink sm:text-5xl">
              Where The Mountains Slow Time Down
            </h2>
          </div>
          <LinkButton href="/explore-ooty" variant="outline">
            Explore Ooty
          </LinkButton>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {nearby.map((n, i) => (
            <Reveal key={n.title} delayMs={i * 100}>
              <div className="flex h-full flex-col justify-between bg-petrol-50 p-6">
                <div>
                  <span className="label-caps text-petrol-500">{n.label}</span>
                  <h3 className="mt-2 font-display text-lg font-medium text-ink">{n.title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-ink/70">{n.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =============================== CLOSING CTA =============================== */}
      <section className="relative overflow-hidden bg-charcoal text-stone">
        <ContourLines
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full text-petrol-400"
          opacity={0.18}
        />
        <Reveal className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="label-caps text-petrol-300">Your Nilgiri Chapter Awaits</span>
          <h2 className="mt-5 font-display text-4xl font-normal leading-[1.05] sm:text-5xl">
            Ready for Your Mountain Getaway?
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-light leading-relaxed text-stone/75">
            Reserve your room today and let us take care of the rest. Secure payment, instant confirmation, unforgettable memories.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkButton href="/rooms" variant="accent">
              Book Now
            </LinkButton>
            {settings.whatsapp_owner_number && (
              <a
                href={`https://wa.me/${settings.whatsapp_owner_number.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps inline-flex items-center justify-center gap-2 border border-stone/40 px-7 py-3.5 text-stone transition hover:bg-stone hover:text-ink"
              >
                <Icon name="chat" className="text-base" />
                WhatsApp Us
              </a>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
