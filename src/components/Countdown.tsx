"use client";

import { useEffect, useMemo, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown() {
  // ✅ Cambia la fecha cuando quieras
  const targetDate = useMemo(() => new Date("2026-06-26T10:00:00-05:00"), []);
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = targetDate.getTime() - now.getTime();
  const isPast = diff <= 0;

  const total = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(total / (3600 * 24));
  const hours = Math.floor((total % (3600 * 24)) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  return (
    <div className="rounded-3xl border border-pink-200 bg-white/70 p-8 shadow-lg shadow-pink-200/40">
      <h3 className="text-xl font-semibold text-neutral-900">Cuenta regresiva ⏳</h3>

      {isPast ? (
        <p className="mt-3 text-neutral-700">¡Ya llegó el día! 💕</p>
      ) : (
        <>
          <p className="mt-2 text-neutral-600">Para vernos en persona faltan:</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Tile label="Días" value={days.toString()} />
            <Tile label="Horas" value={pad(hours)} />
            <Tile label="Min" value={pad(minutes)} />
            <Tile label="Seg" value={pad(seconds)} />
          </div>
        </>
      )}
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-pink-200 bg-white/80 p-4 text-center">
      <div className="text-3xl font-semibold text-neutral-900">{value}</div>
      <div className="mt-1 text-xs text-neutral-600">{label}</div>
    </div>
  );
}
