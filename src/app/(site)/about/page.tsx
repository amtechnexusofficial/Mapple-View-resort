import type { Metadata } from "next";
import { SettingsModel } from "@/lib/models";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = { title: "About Us | Mapple View Resort" };

export default function AboutPage() {
  const settings = SettingsModel.get();

  const values = [
    { title: "Warm Hospitality", desc: "Every guest is welcomed like family, with attentive and genuine service." },
    { title: "Natural Serenity", desc: "Surrounded by hills and greenery, designed for rest and rejuvenation." },
    { title: "Comfort First", desc: "Thoughtfully furnished rooms with all the amenities you need." },
  ];

  return (
    <div>
      <section className="bg-forest-800 py-20 text-center text-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            About Us
          </span>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            {settings.resort_name}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-relaxed text-ink/80">
          {settings.description}
        </p>
        <p className="mt-6 leading-relaxed text-ink/70">
          Whether you&apos;re planning a peaceful family holiday, a romantic getaway, or a solo retreat into nature,
          {" "}{settings.resort_name} offers the perfect blend of comfort and scenery. Our team is dedicated to making
          your stay memorable, from the moment you book to the moment you check out.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm">
              <div className="h-1 w-10 rounded-full bg-gold-500" />
              <h3 className="mt-4 font-display text-lg font-semibold text-forest-800">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{v.desc}</p>
            </div>
          ))}
        </div>

        {settings.address && (
          <div className="mt-14 rounded-2xl bg-forest-50 p-8">
            <h3 className="font-display text-lg font-semibold text-forest-800">
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
