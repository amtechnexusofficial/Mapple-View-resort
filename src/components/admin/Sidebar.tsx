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
    <aside className="flex w-full flex-col border-charcoal-light bg-charcoal text-stone md:h-screen md:w-64 md:border-r">
      <div className="px-6 py-6">
        <p className="font-sans text-lg font-semibold">Mapple View</p>
        <p className="text-xs text-stone/50">Admin Panel</p>
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
                  ? "bg-ink text-stone"
                  : "text-stone/70 hover:bg-charcoal-light hover:text-stone"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-charcoal-light px-6 py-4">
        <p className="truncate text-xs text-stone/50">Signed in as {username}</p>
        <button
          onClick={handleLogout}
          className="mt-2 text-sm font-medium text-petrol-400 hover:text-petrol-300"
        >
          Log Out
        </button>
        <Link
          href="/"
          className="mt-2 block text-xs text-stone/50 hover:text-stone"
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}
