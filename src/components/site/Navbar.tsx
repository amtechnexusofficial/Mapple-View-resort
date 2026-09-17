import Link from "next/link";
import { SettingsModel } from "@/lib/models";
import { MountainMark } from "@/components/site/MountainArt";

export default async function Navbar() {
  const settings = await SettingsModel.get();

  const links = [
    { href: "/", label: "Stay" },
    { href: "/rooms", label: "The Rooms" },
    { href: "/about", label: "About" },
    { href: "/explore-ooty", label: "Explore Ooty" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-stone/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <MountainMark className="h-7 w-7 shrink-0 text-charcoal" />
          <span className="flex flex-col leading-none">
            <span className="label-caps text-ink">{settings.resort_name}</span>
            <span className="label-caps mt-1 text-[0.6rem] text-ink-soft/70">
              Ooty · Nilgiris
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label-caps text-ink-soft transition hover:text-charcoal"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {settings.contact_phone && (
            <a
              href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
              className="label-caps hidden text-ink-soft xl:block"
            >
              {settings.contact_phone}
            </a>
          )}
          <Link
            href="/rooms"
            className="label-caps hidden bg-charcoal px-5 py-3 text-stone transition hover:bg-charcoal-light sm:inline-flex"
          >
            Check Availability
          </Link>
        </div>
      </div>
      <nav className="flex items-center gap-6 overflow-x-auto border-t border-line px-4 py-2.5 lg:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="label-caps whitespace-nowrap text-ink-soft">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
