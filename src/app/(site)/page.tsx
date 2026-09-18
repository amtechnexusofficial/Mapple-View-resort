import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import SectionLabel from "@/components/site/SectionLabel";
import { stockImages, stockRoomImage } from "@/lib/stockImages";
import HeroBookingBar from "@/components/site/HeroBookingBar";
import RoomShowcase from "@/components/site/RoomShowcase";
import WakeUpHereTimeline from "@/components/site/WakeUpHereTimeline";
import ChooseYourEscape from "@/components/site/ChooseYourEscape";
import ExploreOotyPanel from "@/components/site/ExploreOotyPanel";
import PanoramicDrag from "@/components/site/PanoramicDrag";
import GalleryGrid, { type GalleryItem } from "@/components/site/GalleryGrid";
import FaqAccordion from "@/components/site/FaqAccordion";
import Testimonials from "@/components/site/Testimonials";
import LocationSection from "@/components/site/LocationSection";
import Reveal from "@/components/site/Reveal";
import { RoomModel, SettingsModel } from "@/lib/models";
import { seasons } from "@/lib/ooty";
import { mapsDirectionsUrl, RESORT_LOCATION } from "@/lib/location";

const ethos = [
  {
    icon: "landscape",
    title: "Elevated Mountain Setting",
    desc: "Set at over 2,200 metres in the Nilgiri hills, with cool air and hill views year-round.",
  },
  {
    icon: "forest",
    title: "Quiet, Wooded Surroundings",
    desc: "Lovedale is one of the quieter corners near Ooty, away from the busiest market roads.",
  },
  {
    icon: "wifi",
    title: "Free Wi-Fi",
    desc: "Complimentary high-speed internet throughout your stay.",
  },
  {
    icon: "bolt",
    title: "Instant Confirmation",
    desc: "Your booking request reaches us instantly via WhatsApp for a quick response.",
  },
];

export default async function HomePage() {
  const [settings, allRooms] = await Promise.all([
    SettingsModel.get(),
    RoomModel.all(),
  ]);
  const rooms = allRooms.slice(0, 3);

  const faqItems = [
    {
      q: "What are the check-in and check-out timings?",
      a: `Check-in is from ${settings.check_in_time || "12:00 PM"} and check-out is by ${
        settings.check_out_time || "11:00 AM"
      }. Let us know in advance if you need different timing and we'll try to accommodate it.`,
    },
    { q: "Is Wi-Fi available?", a: "Yes, complimentary Wi-Fi is available throughout the resort." },
    {
      q: "Is parking available?",
      a: "Please contact us directly to confirm parking arrangements ahead of your visit.",
    },
    {
      q: "Is breakfast included?",
      a: "This can vary by room and season — please check with us at the time of booking.",
    },
    {
      q: "Do you allow pets?",
      a: "Please contact us before booking to confirm our current pet policy.",
    },
    {
      q: "Are children welcome?",
      a: "Yes. Please share the number and age of children when enquiring so we can suggest the right room.",
    },
    {
      q: "What is your cancellation policy?",
      a: "Please contact us directly for our current cancellation and rescheduling policy.",
    },
    {
      q: "How do I get to Mapple View Resort?",
      a: "We're in Lovedale, on the outskirts of Ooty. See the Location section below for directions, or our About page for a fuller guide on getting here.",
    },
  ];

  const galleryItems: GalleryItem[] = [
    ...allRooms.map((r, i) => ({
      id: `${r.id}-0`,
      category: "rooms" as const,
      src: r.images[0] || stockRoomImage(i),
      caption: r.name,
      span: i === 0 ? ("wide" as const) : undefined,
    })),
    { id: "view-sunbeams", category: "views" as const, src: stockImages.gallery.sunbeams, caption: "Morning light over the tea ridge" },
    { id: "view-tub", category: "views" as const, src: stockImages.gallery.soakingTub, caption: "A quiet corner, view included" },
    { id: "view-facade", category: "views" as const, src: stockImages.gallery.facade, caption: "The estate, from the driveway" },
    { id: "dining-main", category: "dining" as const, src: stockImages.dining.main, caption: "A warm plate at altitude", span: "wide" },
    { id: "dining-tea", category: "dining" as const, src: stockImages.dining.tea, caption: "Tea country, in a cup" },
  ];

  return (
    <div>
      {/* ============================= HERO ============================= */}
      <section className="relative isolate flex min-h-[92vh] flex-col justify-between overflow-hidden text-stone">
        <Image
          src={settings.hero_image || stockImages.heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/15" />

        <div className="label-caps relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-b border-stone/20 px-4 pt-8 pb-4 text-stone/80 sm:px-6">
          <span>{RESORT_LOCATION.coordsLabel} &nbsp;&middot;&nbsp; ~2,200M ELEVATION</span>
          <span>LOVEDALE &middot; OOTY, NILGIRIS</span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <span className="label-caps text-petrol-300">{settings.resort_name}</span>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-normal leading-[1.05] sm:text-7xl lg:text-8xl">
            {settings.tagline || "A quiet escape in the Nilgiris."}
          </h1>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-stone/80 sm:text-lg">
            {settings.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#rooms"
              className="label-caps bg-petrol-500 px-7 py-3.5 text-stone transition hover:bg-petrol-600"
            >
              Explore the Resort
            </a>
            <a
              href="#quick-booking"
              className="label-caps border border-stone/40 px-7 py-3.5 text-stone/90 transition hover:bg-stone hover:text-ink"
            >
              Check Availability
            </a>
          </div>
        </div>

        <HeroBookingBar />

        <div className="label-caps relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pb-6 pt-3 text-stone/60 sm:px-6">
          <span>Scroll to Discover</span>
          <Icon name="south" className="animate-bounce text-base" />
        </div>
      </section>

      {/* ========================= 01 · THE ESCAPE ========================= */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel index="01" eyebrow="Sanctuary Ethos" />
            <h2 className="mt-5 font-display text-3xl font-normal leading-[1.15] text-ink sm:text-4xl">
              Above the noise.
              <br />
              <span className="italic font-light">Closer to the clouds.</span>
            </h2>
            <p className="mt-5 text-sm font-light leading-relaxed text-ink/70 sm:text-base">
              {settings.escape_intro}
            </p>
            <div className="mt-8 space-y-5">
              {ethos.slice(0, 2).map((h) => (
                <div key={h.title} className="flex items-start gap-4">
                  <Icon name={h.icon} className="mt-0.5 text-xl text-petrol-500" />
                  <div>
                    <h4 className="font-display text-base font-medium text-ink">{h.title}</h4>
                    <p className="mt-1 text-sm font-light text-ink/70">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              <div className="relative col-span-7 h-[420px] overflow-hidden bg-petrol-100 sm:h-[520px]">
                <Image
                  src={stockImages.escapeTall}
                  alt="Morning mist over the hills near Mapple View"
                  fill
                  sizes="(min-width: 1024px) 40vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="col-span-5 pt-16">
                <div className="relative h-[300px] overflow-hidden bg-petrol-100 sm:h-[380px]">
                  <Image
                    src={stockImages.escapeSquare}
                    alt="A warm, quiet corner at Mapple View"
                    fill
                    sizes="(min-width: 1024px) 25vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= 02 · BRAND STORY ========================= */}
      <section className="border-y border-petrol-100 bg-petrol-50/50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel index="02" eyebrow="This Is Mapple View" />
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-normal text-ink sm:text-4xl">
            The Mapple View Story
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-display text-2xl font-light italic leading-snug text-ink">
                &ldquo;{settings.description}&rdquo;
              </p>
            </div>
            <div className="space-y-4 text-sm font-light leading-relaxed text-ink/70 lg:col-span-8">
              <p>{settings.brand_story}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =============================== 03 · ROOMS =============================== */}
      {rooms.length > 0 && (
        <section id="rooms" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel index="03" eyebrow="Accommodation Portfolio" />
              <h2 className="mt-5 font-display text-4xl font-normal leading-[1.05] text-ink sm:text-5xl">
                Our Rooms &amp; Suites
              </h2>
            </div>
            <LinkButton href="/rooms" variant="outline">
              View All Rooms
            </LinkButton>
          </Reveal>
          <div className="mt-14">
            <RoomShowcase rooms={rooms} whatsappNumber={settings.whatsapp_owner_number} />
          </div>
        </section>
      )}

      {/* ========================= 04 · WAKE UP HERE ========================= */}
      <section className="bg-petrol-50/50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel index="04" eyebrow="Sensory Chronology" className="justify-center" />
            <h2 className="mt-5 font-display text-3xl font-normal text-ink sm:text-4xl">
              Wake Up Here: The Rhythm of a Day
            </h2>
            <p className="mt-3 text-sm font-light text-ink/70">
              Time slows in the high Nilgiris. Here&apos;s how a day at the resort tends to unfold.
            </p>
          </div>
          <div className="mt-12">
            <WakeUpHereTimeline />
          </div>
        </div>
      </section>

      {/* ========================= 05 · CHOOSE YOUR ESCAPE ========================= */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <SectionLabel index="05" eyebrow="Curated Stays" />
            <h2 className="mt-5 font-display text-3xl font-normal text-ink sm:text-4xl">
              What Brings You to Ooty?
            </h2>
            <p className="mt-3 text-sm font-light text-ink/70">
              Pick what you&apos;re here for and we&apos;ll point you toward the right room.
            </p>
          </div>
          <div className="mt-10">
            <ChooseYourEscape />
          </div>
        </div>
      </section>

      {/* ========================= 06 · EXPLORE OOTY ========================= */}
      <section className="bg-charcoal py-24 text-stone sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel index="06" eyebrow="Destination Compendium" className="text-petrol-300" />
              <h2 className="mt-5 font-display text-3xl font-normal text-stone sm:text-4xl">
                Where the Mountains Slow Time Down
              </h2>
            </div>
            <Link
              href="/explore-ooty"
              className="label-caps border-b border-stone/40 pb-1 text-stone/80 hover:text-petrol-300"
            >
              Full Ooty Guide
            </Link>
          </div>
          <div className="mt-12">
            <ExploreOotyPanel />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-stone/15 pt-10 sm:grid-cols-3">
            {seasons.map((s) => (
              <div key={s.title}>
                <span className="label-caps text-petrol-300">{s.title}</span>
                <p className="mt-2 text-sm font-light text-stone/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= 07 · THE VIEW ========================= */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <SectionLabel index="07" eyebrow="Unfiltered Perspective" />
        <h2 className="mt-5 max-w-xl font-display text-3xl font-normal text-ink sm:text-4xl">
          Some views don&apos;t need a filter.
        </h2>
        <div className="mt-10">
          <PanoramicDrag />
        </div>
      </section>

      {/* ========================= 08 · GALLERY ========================= */}
      <section className="bg-petrol-50/50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel index="08" eyebrow="The Visual Journal" />
          <h2 className="mt-5 font-display text-3xl font-normal text-ink sm:text-4xl">
            Curated Estate Frames
          </h2>
          <p className="mt-3 max-w-xl text-sm font-light text-ink/70">
            Real room photos as they&apos;re added, alongside placeholder Nilgiri imagery in the
            meantime.
          </p>
          <div className="mt-10">
            <GalleryGrid items={galleryItems} />
          </div>
        </div>
      </section>

      {/* ========================= 09 · DINING ========================= */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionLabel index="09" eyebrow="Taste the Hills" />
            <h2 className="mt-5 font-display text-3xl font-normal text-ink sm:text-4xl">
              Dining at Mapple View
            </h2>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-ink/70">
              Full dining details and menus are coming soon. For current breakfast and meal
              arrangements, please ask us directly when you enquire or book.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden bg-petrol-100">
              <Image src={stockImages.dining.main} alt="" fill sizes="60vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden bg-petrol-100">
              <Image src={stockImages.dining.tea} alt="" fill sizes="30vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden bg-petrol-100">
              <Image src={stockImages.dining.produce} alt="" fill sizes="30vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================= 10 · FAQ ========================= */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionLabel index="10" eyebrow="Good to Know" />
          <h2 className="mt-5 font-display text-3xl font-normal text-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ========================= 11 · GUEST MOMENTS ========================= */}
      {settings.testimonials.trim() && (
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <SectionLabel index="11" eyebrow="Guest Moments" />
          <h2 className="mt-5 font-display text-3xl font-normal text-ink sm:text-4xl">
            In Their Own Words
          </h2>
          <div className="mt-10">
            <Testimonials raw={settings.testimonials} />
          </div>
        </section>
      )}

      {/* ========================= 12 · LOCATION ========================= */}
      <section className="bg-petrol-50/50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel index="12" eyebrow="Arrival & Access" />
          <h2 className="mt-5 font-display text-3xl font-normal text-ink sm:text-4xl">
            Find Mapple View Resort
          </h2>
          <div className="mt-10">
            <LocationSection settings={settings} />
          </div>
        </div>
      </section>

      {/* ========================= SOCIAL (optional) ========================= */}
      {settings.instagram_handle && (
        <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="label-caps text-petrol-500">Estate Dispatches</span>
          <a
            href={`https://instagram.com/${settings.instagram_handle.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block font-display text-2xl font-normal text-ink hover:text-petrol-600"
          >
            @{settings.instagram_handle.replace(/^@/, "")}
          </a>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-4 gap-3">
            {stockImages.social.map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden bg-petrol-100">
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =============================== FINAL CTA =============================== */}
      <section className="relative overflow-hidden bg-charcoal text-stone">
        <Image
          src={stockImages.timeline[4]}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-luminosity"
        />
        <Reveal className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="label-caps text-petrol-300">Your Ooty Escape Starts Here</span>
          <h2 className="mt-5 font-display text-4xl font-normal leading-[1.05] sm:text-5xl">
            Come for the mountains.
            <br />
            <span className="italic font-light">Stay for the moments.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-light leading-relaxed text-stone/75">
            Reserve your room today and let us take care of the rest.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkButton href="/rooms" variant="accent">
              Check Availability
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
            <a
              href={mapsDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps inline-flex items-center justify-center gap-2 border border-stone/40 px-7 py-3.5 text-stone transition hover:bg-stone hover:text-ink"
            >
              <Icon name="directions" className="text-base" />
              Get Directions
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
