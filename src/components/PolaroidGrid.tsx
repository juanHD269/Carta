"use client";

import Image from "next/image";
import { useState } from "react";
import type { Recuerdo } from "@/data/recuerdos";

export default function PolaroidGrid({ items }: { items: Recuerdo[] }) {
  const [open, setOpen] = useState<Recuerdo | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r, idx) => (
          <button
            key={r.id}
            onClick={() => setOpen(r)}
            className="group text-left"
          >
            <div
              className={[
                "rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20 transition",
                "hover:-translate-y-1 hover:rotate-[0.5deg] hover:bg-white/10",
              ].join(" ")}
              style={{
                transform: `rotate(${(idx % 3 - 1) * 1.2}deg)`,
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={r.src}
                  alt={r.caption || ''}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="mt-4 px-1 pb-2">
                <p className="text-sm font-semibold text-white/90">{r.caption}</p>
                {r.date && (
                  <p className="mt-1 text-xs text-white/60">{r.date}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal simple */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-3xl rounded-3xl border border-white/10 bg-neutral-950 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 py-2">
              <p className="text-sm font-semibold text-white/90">{open.caption}</p>
              <button
                onClick={() => setOpen(null)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80 hover:bg-white/10"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={open.src}
                alt={open.caption || ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
