import Link from "next/link";
import { SettingsModel } from "@/lib/models";

export default async function Footer() {
  const settings = await SettingsModel.get();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-forest-100 bg-forest-900 text-forest-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-semibold text-cream">
            {settings.resort_name}
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-forest-100/80">
            {settings.tagline}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gold-400">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-forest-100/80">
            <li><Link href="/rooms" className="hover:text-gold-400">Rooms &amp; Suites</Link></li>
            <li><Link href="/about" className="hover:text-gold-400">About the Resort</Link></li>
            <li><Link href="/contact" className="hover:text-gold-400">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-gold-400">
            Get in Touch
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-forest-100/80">
            {settings.address && <li>{settings.address}</li>}
            {settings.contact_phone && (
              <li>
                <a href={`tel:${settings.contact_phone.replace(/\s/g, "")}`} className="hover:text-gold-400">
                  {settings.contact_phone}
                </a>
              </li>
            )}
            {settings.contact_email && (
              <li>
                <a href={`mailto:${settings.contact_email}`} className="hover:text-gold-400">
                  {settings.contact_email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-800 px-4 py-5 text-center text-xs text-forest-100/60 sm:px-6">
        © {year} {settings.resort_name}. All rights reserved.
      </div>
    </footer>
  );
}
