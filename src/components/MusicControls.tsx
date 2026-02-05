"use client";

import { useState } from "react";
import { useMusic } from "@/components/MusicProvider";

export default function MusicControls() {
  const { isPlaying, toggle, volume, setVolume, hasStarted } = useMusic();
  const [minimized, setMinimized] = useState(false);

  // ✅ No mostrar nada hasta que la música haya empezado
  if (!hasStarted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-600 shadow-lg shadow-pink-200/40 hover:bg-white transition"
        >
          🎵 Música
        </button>
      ) : (
        <div className="w-[270px] rounded-3xl border border-pink-200 bg-white/85 p-4 shadow-lg shadow-pink-200/40 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-neutral-900">🎵 Música</div>
            <button
              onClick={() => setMinimized(true)}
              className="rounded-full border border-pink-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-600 hover:bg-pink-50 transition"
            >
              Ocultar
            </button>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={toggle}
              className="rounded-2xl bg-rose-400 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-rose-200 hover:bg-rose-500 transition"
            >
              {isPlaying ? "Pausar" : "Play"}
            </button>

            <div className="flex-1">
              <label className="block text-[11px] text-neutral-600">
                Volumen: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="mt-1 w-full accent-rose-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
