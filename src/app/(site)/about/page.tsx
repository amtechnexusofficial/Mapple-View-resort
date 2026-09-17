import type { Metadata } from "next";
import Link from "next/link";
import { SettingsModel } from "@/lib/models";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = { title: "About Us | Mapple View Resort" };

const values = [
  { title: "Warm Hospitality", desc: "Every guest is welcomed like family, with attentive and genuine service." },
  { title: "Natural Serenity", desc: "Surrounded by hills and greenery, designed for rest and rejuvenation." },
  { title: "Comfort First", desc: "Thoughtfully furnished rooms with all the amenities you need." },
];

const gettingHere = [
  {
    title: "By Air",
    desc: "Coimbatore International Airport (CJB) is the nearest airport, about 85-90 km away, roughly a 3-hour drive up the Nilgiri ghat roads.",
  },
  {
    title: "By Train",
    desc: "Ooty's own railway station is the terminus of the Nilgiri Mountain Railway, a UNESCO World Heritage \"toy train\" that climbs from Mettupalayam through Coonoor. Mettupalayam and Coimbatore are the nearest broad-gauge junctions.",
  },
  {
    title: "By Road",
    desc: "Ooty is well connected by road from Coimbatore, Mysore, and Bengaluru. Lovedale sits just a few minutes outside Ooty town, on the quieter side near the Ooty Golf Club and Lawrence School.",
  },
];

export default async function AboutPage() {
  const settings = await SettingsModel.get();
  const paragraphs = (settings.about_content || settings.description)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div>
      <section className="bg-charcoal-light py-20 text-center text-stone">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-petrol-400">
            About Us
          </span>
          <h1 className="mt-2 font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
            {settings.resort_name}
          </h1>
          <p className="mt-3 text-sm text-stone/70">Lovedale, Ooty · The Nilgiri Hills</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={i === 0 ? "text-lg leading-relaxed text-ink/80" : "leading-relaxed text-ink/70"}
            >
              {p}
            </p>
          ))}
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-petrol-100 bg-white p-6 shadow-sm">
              <div className="h-1 w-10 rounded-full bg-petrol-500" />
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-petrol-600">
            Getting Here
          </span>
          <h2 className="mt-2 font-display text-2xl font-medium text-ink">
            Reaching Lovedale &amp; Ooty
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {gettingHere.map((g) => (
              <div key={g.title}>
                <h3 className="font-display text-base font-semibold text-ink">{g.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-petrol-50 p-6 text-sm text-ink/70">
          Curious what to see and do while you&apos;re here? Have a look at our guide to{" "}
          <Link href="/explore-ooty" className="font-semibold text-petrol-600 hover:underline">
            Exploring Ooty &amp; the Nilgiris
          </Link>
          .
        </div>

        {settings.address && (
          <div className="mt-10 rounded-2xl bg-petrol-50 p-8">
            <h3 className="font-display text-lg font-semibold text-ink">
              Find Us
            </h3>
            <p className="mt-2 text-ink/70">{settings.address}</p>
            <p className="mt-1 text-sm text-ink/60">
              Check-in: {settings.check_in_time} · Check-out: {settings.check_out_time}
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <LinkButton href="/rooms" variant="primary">
            View Our Rooms
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
