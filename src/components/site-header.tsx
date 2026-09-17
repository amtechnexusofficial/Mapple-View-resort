"use client";

import { useState } from "react";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/", label: "Stay" },
  { href: "/#experience", label: "Experience" },
  { href: "/#wake-up-here", label: "Wake Up Here" },
  { href: "/#the-rooms", label: "The Rooms" },
  { href: "/#explore-ooty", label: "Explore Ooty" },
  { href: "/#dining", label: "Dining" },
  { href: "/#gallery", label: "Gallery" },
];

export function SiteHeader({ hotelName, ownerPhone }: { hotelName: string; ownerPhone: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappHref = ownerPhone
    ? buildWhatsAppLink(ownerPhone, `Hi, I'd like to know more about ${hotelName}.`)
    : undefined;

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-20 w-full px-margin-sm lg:px-margin-lg flex items-center justify-between">
        <Link href="/" className="flex items-center gap-space-sm">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-[0.2em]">
              {hotelName}
            </span>
            <span className="font-label-caps text-label-caps uppercase text-outline text-[0.625rem] tracking-[0.25em]">
              OOTY · NILGIRIS
            </span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-space-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm">
          <div className="hidden md:flex items-center gap-space-xs px-space-sm py-1.5 rounded-full bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-outline">thermostat</span>
            <span className="font-label-caps text-label-caps text-on-surface tracking-wider uppercase">
              16°C · Misty Ooty
            </span>
          </div>
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors py-2 px-space-xs"
            >
              WHATSAPP ENQUIRY
            </a>
          )}
          <Link
            href="/#quick-booking"
            className="hidden lg:inline-flex items-center justify-center bg-primary-container text-on-primary font-label-caps text-label-caps uppercase px-space-md py-3 hover:bg-secondary hover:text-on-secondary transition-colors"
          >
            CHECK AVAILABILITY
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <button
            aria-label="Open Sanctuary Menu"
            aria-expanded={menuOpen}
            className="xl:hidden p-2 text-primary hover:text-secondary focus:outline-none"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="material-symbols-outlined text-2xl">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="xl:hidden w-full bg-surface border-t border-outline-variant/40 px-margin-sm py-space-sm flex flex-col gap-space-xs">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-primary transition-colors py-space-xs"
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="/#quick-booking"
            onClick={() => setMenuOpen(false)}
            className="mt-space-xs inline-flex items-center justify-center bg-primary-container text-on-primary font-label-caps text-label-caps uppercase px-space-md py-3 hover:bg-secondary hover:text-on-secondary transition-colors"
          >
            CHECK AVAILABILITY
          </Link>
        </nav>
      )}
    </header>
  );
}
