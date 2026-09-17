import Link from "next/link";
import { SettingsModel } from "@/lib/models";

export default async function Footer() {
  const settings = await SettingsModel.get();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-petrol-100 bg-charcoal text-stone">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-semibold text-stone">
            {settings.resort_name}
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone/80">
            {settings.tagline}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-petrol-400">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-stone/80">
            <li><Link href="/rooms" className="hover:text-petrol-400">Rooms &amp; Suites</Link></li>
            <li><Link href="/about" className="hover:text-petrol-400">About the Resort</Link></li>
            <li><Link href="/contact" className="hover:text-petrol-400">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-petrol-400">
            Get in Touch
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-stone/80">
            {settings.address && <li>{settings.address}</li>}
            {settings.contact_phone && (
              <li>
                <a href={`tel:${settings.contact_phone.replace(/\s/g, "")}`} className="hover:text-petrol-400">
                  {settings.contact_phone}
                </a>
              </li>
            )}
            {settings.contact_email && (
              <li>
                <a href={`mailto:${settings.contact_email}`} className="hover:text-petrol-400">
                  {settings.contact_email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-charcoal-light px-4 py-5 text-center text-xs text-stone/60 sm:px-6">
        © {year} {settings.resort_name}. All rights reserved.
      </div>
    </footer>
  );
}
