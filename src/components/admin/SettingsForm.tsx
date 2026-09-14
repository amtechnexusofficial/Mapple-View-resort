"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Settings } from "@/lib/types";

type FormState = {
  resortName: string;
  tagline: string;
  description: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  upiId: string;
  upiPayeeName: string;
  whatsappOwnerNumber: string;
  whatsappApiToken: string;
  whatsappPhoneNumberId: string;
  checkInTime: string;
  checkOutTime: string;
};

function Field({
  label,
  field,
  type = "text",
  hint,
  value,
  onChange,
}: {
  label: string;
  field: keyof FormState;
  type?: string;
  hint?: string;
  value: string;
  onChange: (field: keyof FormState, value: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-ink/60">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
      />
      {hint && <p className="mt-1 text-xs text-ink/40">{hint}</p>}
    </div>
  );
}

export default function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [form, setForm] = useState({
    resortName: settings.resort_name,
    tagline: settings.tagline,
    description: settings.description,
    address: settings.address,
    contactPhone: settings.contact_phone,
    contactEmail: settings.contact_email,
    upiId: settings.upi_id,
    upiPayeeName: settings.upi_payee_name,
    whatsappOwnerNumber: settings.whatsapp_owner_number,
    whatsappApiToken: settings.whatsapp_api_token,
    whatsappPhoneNumberId: settings.whatsapp_phone_number_id,
    checkInTime: settings.check_in_time,
    checkOutTime: settings.check_out_time,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Failed to save settings" });
        setSubmitting(false);
        return;
      }
      setMessage({ type: "ok", text: "Settings saved successfully." });
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <section>
        <h2 className="font-display text-lg font-semibold text-forest-800">
          Resort Information
        </h2>
        <div className="mt-4 space-y-4">
          <Field label="Resort Name" field="resortName" value={form.resortName} onChange={set} />
          <Field label="Tagline" field="tagline" value={form.tagline} onChange={set} />
          <div>
            <label className="text-xs font-medium text-ink/60">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="mt-1 w-full rounded-lg border border-forest-200 px-3 py-2 text-sm focus:border-forest-500 focus:outline-none"
            />
          </div>
          <Field label="Address" field="address" value={form.address} onChange={set} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Contact Phone" field="contactPhone" value={form.contactPhone} onChange={set} />
            <Field label="Contact Email" field="contactEmail" type="email" value={form.contactEmail} onChange={set} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Check-in Time" field="checkInTime" value={form.checkInTime} onChange={set} />
            <Field label="Check-out Time" field="checkOutTime" value={form.checkOutTime} onChange={set} />
          </div>
        </div>
      </section>

      <section className="border-t border-forest-100 pt-6">
        <h2 className="font-display text-lg font-semibold text-forest-800">
          UPI Payment
        </h2>
        <p className="mt-1 text-xs text-ink/50">
          Guests scan a QR code generated from this UPI ID to pay for their booking.
        </p>
        <div className="mt-4 space-y-4">
          <Field label="UPI ID (VPA)" field="upiId" hint="e.g. resortname@okicici" value={form.upiId} onChange={set} />
          <Field label="Payee Name" field="upiPayeeName" value={form.upiPayeeName} onChange={set} />
        </div>
      </section>

      <section className="border-t border-forest-100 pt-6">
        <h2 className="font-display text-lg font-semibold text-forest-800">
          WhatsApp Notifications
        </h2>
        <p className="mt-1 text-xs text-ink/50">
          When a guest confirms a booking, we&apos;ll try to notify this number automatically. If the
          API isn&apos;t configured, the guest&apos;s device will open a pre-filled WhatsApp message instead.
        </p>
        <div className="mt-4 space-y-4">
          <Field
            label="Owner WhatsApp Number"
            field="whatsappOwnerNumber"
            hint="Include country code, e.g. 919876543210"
            value={form.whatsappOwnerNumber}
            onChange={set}
          />
          <Field
            label="WhatsApp Cloud API Access Token (optional)"
            field="whatsappApiToken"
            value={form.whatsappApiToken}
            onChange={set}
          />
          <Field
            label="WhatsApp Cloud API Phone Number ID (optional)"
            field="whatsappPhoneNumberId"
            value={form.whatsappPhoneNumberId}
            onChange={set}
          />
        </div>
      </section>

      {message && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            message.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-forest-700 px-6 py-2.5 text-sm font-semibold text-cream hover:bg-forest-800 disabled:opacity-60"
      >
        {submitting ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
