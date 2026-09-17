import type { Metadata } from "next";
import { SettingsModel } from "@/lib/models";

export const metadata: Metadata = { title: "Contact Us | Mapple View Resort" };

export default async function ContactPage() {
  const settings = await SettingsModel.get();
  const waNumber = settings.whatsapp_owner_number.replace(/[^\d]/g, "");

  return (
    <div>
      <section className="bg-charcoal-light py-20 text-center text-stone">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-petrol-400">
            Get in Touch
          </span>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Contact Us
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2">
          {settings.contact_phone && (
            <div className="rounded-2xl border border-petrol-100 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-ink">Phone</h3>
              <a
                href={`tel:${settings.contact_phone.replace(/\s/g, "")}`}
                className="mt-2 block text-ink/70 hover:text-petrol-600"
              >
                {settings.contact_phone}
              </a>
            </div>
          )}
          {settings.contact_email && (
            <div className="rounded-2xl border border-petrol-100 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-ink">Email</h3>
              <a
                href={`mailto:${settings.contact_email}`}
                className="mt-2 block text-ink/70 hover:text-petrol-600"
              >
                {settings.contact_email}
              </a>
            </div>
          )}
          {settings.address && (
            <div className="rounded-2xl border border-petrol-100 bg-white p-6 shadow-sm sm:col-span-2">
              <h3 className="font-display text-lg font-semibold text-ink">Address</h3>
              <p className="mt-2 text-ink/70">{settings.address}</p>
            </div>
          )}
          {waNumber && (
            <div className="rounded-2xl border border-petrol-100 bg-white p-6 shadow-sm sm:col-span-2">
              <h3 className="font-display text-lg font-semibold text-ink">WhatsApp</h3>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-ink/70 hover:text-petrol-600"
              >
                Chat with us on WhatsApp
              </a>
            </div>
          )}
        </div>

        <p className="mt-10 text-center text-sm text-ink/60">
          Check-in: {settings.check_in_time} · Check-out: {settings.check_out_time}
        </p>
      </section>
    </div>
  );
}
