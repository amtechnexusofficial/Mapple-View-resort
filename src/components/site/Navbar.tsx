import Link from "next/link";
import { SettingsModel } from "@/lib/models";

export default async function Navbar() {
  const settings = await SettingsModel.get();

  const links = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold text-forest-800 sm:text-2xl">
            {settings.resort_name}
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-forest-700 transition hover:text-gold-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {settings.contact_phone && (
            <a
              href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
              className="hidden text-sm font-medium text-forest-700 sm:block"
            >
              {settings.contact_phone}
            </a>
          )}
          <Link
            href="/rooms"
            className="rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-cream shadow-sm transition hover:bg-forest-800"
          >
            Book Now
          </Link>
        </div>
      </div>
      <nav className="flex items-center gap-6 overflow-x-auto border-t border-forest-100 px-4 py-2 text-sm font-medium text-forest-700 md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
