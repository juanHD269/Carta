"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/carta", label: "Carta" },
  { href: "/recuerdos", label: "Recuerdos" },
  { href: "/sorpresa", label: "Sorpresa" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-pink-200 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold text-neutral-900">
          💌 Carta
        </Link>

        <nav className="flex gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "rounded-full px-3 py-1 text-sm transition",
                  active
                    ? "bg-rose-400 text-white shadow-sm shadow-rose-200"
                    : "text-neutral-700 hover:bg-pink-100",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
