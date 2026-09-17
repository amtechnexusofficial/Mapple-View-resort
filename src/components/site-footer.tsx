import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const PILLARS = [
  { href: "/#the-rooms", label: "Private Suites" },
  { href: "/#dining", label: "Nilgiri Botanical Table" },
  { href: "/#experience", label: "Tea Tasting Salon" },
  { href: "/#gallery", label: "Estate Journal" },
];

export function SiteFooter({
  hotelName,
  address,
  contactEmail,
  ownerPhone,
}: {
  hotelName: string;
  address: string;
  contactEmail: string;
  ownerPhone: string;
}) {
  const whatsappHref = ownerPhone
    ? buildWhatsAppLink(ownerPhone, `Hi, I'd like to know more about ${hotelName}.`)
    : undefined;

  return (
    <footer className="w-full bg-surface-container-low text-on-surface pt-space-xl pb-space-lg">
      <div className="w-full px-margin-sm lg:px-margin-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter mb-space-xl">
          <div className="lg:col-span-4 space-y-space-sm">
            <span className="font-headline-sm text-headline-sm text-primary block">{hotelName}</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              An elevated colonial sanctuary resting gracefully within the Nilgiri clouds, celebrating slow living,
              heritage botanicals, and high-altitude tea tradition.
            </p>
            <div className="pt-space-xs">
              <span className="font-label-caps text-label-caps text-outline uppercase block">
                ELEVATION &amp; LOCATION
              </span>
              <p className="font-body-sm text-body-sm text-on-surface mt-1">
                2,240m Above Sea Level · Nilgiri Biosphere
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-space-xs">
            <span className="font-label-caps text-label-caps text-outline uppercase block mb-space-xs">
              ESTATE DESTINATION
            </span>
            <address className="not-italic font-body-sm text-body-sm text-on-surface-variant space-y-1 whitespace-pre-line">
              {address || "Havelock Road, Near Fernhill Palace, Ooty, The Nilgiris District, Tamil Nadu"}
            </address>
          </div>

          <div className="lg:col-span-3 space-y-space-xs">
            <span className="font-label-caps text-label-caps text-outline uppercase block mb-space-xs">
              CURATED CONTACT
            </span>
            <div className="font-body-sm text-body-sm text-on-surface-variant space-y-1">
              {contactEmail && <p>{contactEmail}</p>}
              {ownerPhone && <p>+{ownerPhone}</p>}
            </div>
            {whatsappHref && (
              <div className="pt-space-xs">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label-caps text-label-caps text-secondary hover:text-primary inline-flex items-center gap-1 uppercase"
                >
                  CONCIERGE WHATSAPP<span className="material-symbols-outlined text-[14px]">chat</span>
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-space-xs">
            <span className="font-label-caps text-label-caps text-outline uppercase block mb-space-xs">
              SANCTUARY PILLARS
            </span>
            <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-2">
              {PILLARS.map((pillar) => (
                <li key={pillar.label}>
                  <Link href={pillar.href} className="hover:text-primary transition-colors">
                    {pillar.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-caps text-label-caps text-on-surface-variant border-t border-outline-variant/30">
          <span className="uppercase pt-space-lg md:pt-0">
            © {new Date().getFullYear()} {hotelName}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
