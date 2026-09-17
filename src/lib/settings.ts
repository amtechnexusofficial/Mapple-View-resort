import "server-only";
import { sql } from "@/lib/db";

export type Settings = {
  hotel_name: string;
  tagline: string;
  address: string;
  owner_phone: string;
  upi_id: string;
  upi_payee_name: string;
  contact_email: string;
  hero_image: string;
  about_text: string;
};

const KEYS: (keyof Settings)[] = [
  "hotel_name",
  "tagline",
  "address",
  "owner_phone",
  "upi_id",
  "upi_payee_name",
  "contact_email",
  "hero_image",
  "about_text",
];

export async function getSettings(): Promise<Settings> {
  const rows = (await sql`SELECT key, value FROM settings`) as { key: string; value: string }[];
  const map = new Map(rows.map((r) => [r.key, r.value]));
  const settings = {} as Settings;
  for (const key of KEYS) {
    settings[key] = map.get(key) ?? "";
  }
  return settings;
}

export async function updateSettings(input: Partial<Settings>): Promise<void> {
  for (const key of KEYS) {
    const value = input[key];
    if (value !== undefined) {
      await sql`
        INSERT INTO settings (key, value) VALUES (${key}, ${value})
        ON CONFLICT (key) DO UPDATE SET value = excluded.value
      `;
    }
  }
}
