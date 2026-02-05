"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Recuerdo } from "@/data/recuerdos";

function chunk<T>(arr: T[], n: number) {
  const cols: T[][] = Array.from({ length: n }, () => []);
  arr.forEach((item, i) => cols[i % n].push(item));
  return cols;
}

export default function CollageGallery({ items }: { items: Recuerdo[] }) {
  const [open, setOpen] = useState<Recuerdo | null>(null);
  const columns = useMemo(() => chunk(items, 3), [items]);

  return (
    <>
      {/* Móvil */}
      <div className="grid gap-5 sm:hidden">
        {items.map((r) => (
          <Card key={r.id} r={r} onOpen={() => setOpen(r)} />
        ))}
      </div>

      {/* Tablet/Desktop */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-6">
            {col.map((r) => (
              <Card key={r.id} r={r} onOpen={() => setOpen(r)} />
            ))}
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-5xl overflow-hidden rounded-3xl border border-pink-200 bg-white/90 shadow-lg shadow-pink-200/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm font-semibold text-neutral-900">
                {open.caption ?? "Recuerdo 💕"}
              </div>
              <button
                onClick={() => setOpen(null)}
                className="rounded-full border border-pink-200 bg-white px-3 py-1 text-sm text-rose-600 hover:bg-pink-50 transition"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-white">
              <Image
                src={open.src}
                alt={open.caption ?? "Recuerdo"}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1000px"
                priority
              />
            </div>

            {(open.caption || open.date) && (
              <div className="px-5 py-4 text-sm text-neutral-700">
                {open.date ? (
                  <div className="text-xs text-neutral-500">{open.date}</div>
                ) : null}
                {open.caption ? <div className="mt-1">{open.caption}</div> : null}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Card({ r, onOpen }: { r: Recuerdo; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="group text-left">
      <div className="overflow-hidden rounded-3xl border border-pink-200 bg-white/70 shadow-lg shadow-pink-200/40 transition hover:-translate-y-1 hover:bg-white/90">
        <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[3/4]">
          <Image
            src={r.src}
            alt={r.caption ?? "Recuerdo"}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {(r.caption || r.date) && (
          <div className="px-4 py-3">
            {r.date && <div className="text-xs text-neutral-500">{r.date}</div>}
            {r.caption && <div className="mt-1 text-sm text-neutral-700">{r.caption}</div>}
          </div>
        )}
      </div>
    </button>
  );
}
