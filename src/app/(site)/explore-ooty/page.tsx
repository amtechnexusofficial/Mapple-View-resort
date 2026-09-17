import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import SectionLabel from "@/components/site/SectionLabel";

export const metadata: Metadata = {
  title: "Explore Ooty & the Nilgiris | Mapple View Resort",
};

const attractions = [
  {
    title: "Ooty Lake",
    desc: "An artificial lake laid out in 1824, ringed by eucalyptus groves. Rent a boat or walk the shoreline path in the cool morning air.",
  },
  {
    title: "Doddabetta Peak",
    desc: "The highest point in the Nilgiris at about 2,637 m. On a clear day the telescope house at the summit gives sweeping views over the entire hill range.",
  },
  {
    title: "Nilgiri Mountain Railway",
    desc: "A UNESCO World Heritage mountain railway. The narrow-gauge \"toy train\" winds from Mettupalayam up through Coonoor to Ooty, one of the great train journeys in India.",
  },
  {
    title: "Government Botanical Garden",
    desc: "Laid out in 1848 in the Italian style, terraced across a hillside with a fossilised tree trunk estimated at over 20 million years old.",
  },
  {
    title: "Tea Estates & Tea Museum",
    desc: "The Nilgiris are one of India's great tea-growing regions. Estate visits and tastings around Ooty and Coonoor show the leaf from bush to cup.",
  },
  {
    title: "Pykara Lake & Falls",
    desc: "About 19 km from Ooty town, a quieter spot for boating on the lake and a short walk to the falls, framed by shola forest.",
  },
  {
    title: "St. Stephen's Church",
    desc: "Consecrated in 1830, one of the oldest churches in the Nilgiris, built with timber said to be salvaged from Tipu Sultan's palace in Seringapatam.",
  },
  {
    title: "Rose Garden",
    desc: "Terraced across a hillside near Elk Hill, one of the largest rose gardens in India with several thousand varieties.",
  },
];

const seasons = [
  {
    title: "Apr - Jun",
    desc: "Summer relief season and the busiest months, with mild days and cool evenings while the plains bake.",
  },
  {
    title: "Sep - Nov",
    desc: "Post-monsoon greenery, clearer skies, and noticeably fewer crowds than summer.",
  },
  {
    title: "Dec - Feb",
    desc: "The coolest stretch of the year, occasionally down to near-freezing at night. Crisp mornings, good visibility.",
  },
];

export default function ExploreOotyPage() {
  return (
    <div>
      <section className="bg-charcoal py-20 text-center text-stone">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionLabel eyebrow="The Nilgiris" className="justify-center text-petrol-300" />
          <h1 className="mt-5 font-display text-4xl font-normal leading-[1.05] sm:text-5xl">
            Explore Ooty
          </h1>
          <p className="mt-4 font-light text-stone/75">
            A guide to the hill station and the Nilgiri hills around Lovedale, for whenever you
            step out from the resort.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <SectionLabel eyebrow="Things to See & Do" />
        <h2 className="mt-5 font-display text-2xl font-normal text-ink sm:text-3xl">
          Around Ooty &amp; the Nilgiri Hills
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((a) => (
            <div key={a.title} className="border-t border-petrol-100 pt-4">
              <h3 className="font-display text-lg font-medium text-ink">{a.title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink/70">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel eyebrow="Planning" />
          <h2 className="mt-5 font-display text-2xl font-normal text-ink sm:text-3xl">
            Best Time to Visit
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-ink/70">
            Ooty stays pleasantly cool year-round thanks to its elevation, so there is no single
            wrong time to come. What changes through the year is crowds, colour, and temperature.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {seasons.map((s) => (
              <div key={s.title}>
                <span className="label-caps text-petrol-500">{s.title}</span>
                <p className="mt-2 text-sm font-light leading-relaxed text-ink/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
          Make Mapple View Resort Your Base
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm font-light leading-relaxed text-ink/70">
          Every attraction above is within reach of Lovedale. Come back each evening to a quiet
          room and a fire, then head out again the next morning.
        </p>
        <div className="mt-8">
          <LinkButton href="/rooms" variant="primary">
            View Our Rooms
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
