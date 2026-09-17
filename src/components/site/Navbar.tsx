import Link from "next/link";
import { SettingsModel } from "@/lib/models";
import { MountainMark } from "@/components/site/MountainArt";

export default async function Navbar() {
  const settings = await SettingsModel.get();

  const links = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/about", label: "About" },
    { href: "/explore-ooty", label: "Explore Ooty" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-petrol-100 bg-stone/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <MountainMark className="h-6 w-6 shrink-0 text-petrol-500" />
          <span className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {settings.resort_name}
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition hover:text-petrol-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {settings.contact_phone && (
            <a
              href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
              className="hidden text-sm font-medium text-ink-soft sm:block"
            >
              {settings.contact_phone}
            </a>
          )}
          <Link
            href="/rooms"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-stone shadow-sm transition hover:bg-charcoal-light"
          >
            Book Now
          </Link>
        </div>
      </div>
      <nav className="flex items-center gap-6 overflow-x-auto border-t border-petrol-100 px-4 py-2 text-sm font-medium text-ink-soft md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
