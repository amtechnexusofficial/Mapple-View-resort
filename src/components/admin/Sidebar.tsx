"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/rooms", label: "Rooms" },
  { href: "/admin/settings", label: "Settings" },
];

export default function Sidebar({ username }: { username: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-forest-800 bg-forest-900 text-cream md:h-screen md:w-64 md:border-r">
      <div className="px-6 py-6">
        <p className="font-display text-lg font-semibold">Mapple View</p>
        <p className="text-xs text-cream/50">Admin Panel</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {links.map((l) => {
          const active = l.exact
            ? pathname === l.href
            : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-forest-700 text-cream"
                  : "text-cream/70 hover:bg-forest-800 hover:text-cream"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-forest-800 px-6 py-4">
        <p className="truncate text-xs text-cream/50">Signed in as {username}</p>
        <button
          onClick={handleLogout}
          className="mt-2 text-sm font-medium text-gold-400 hover:text-gold-300"
        >
          Log Out
        </button>
        <Link
          href="/"
          className="mt-2 block text-xs text-cream/50 hover:text-cream"
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}
