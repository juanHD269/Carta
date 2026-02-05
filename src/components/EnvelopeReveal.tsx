"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "@/components/MusicProvider";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function EnvelopeReveal({
  title = "Para ti 💖",
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const { playSoft } = useMusic();

  return (
    <div className="mx-auto w-full max-w-5xl">
      {!open && (
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => {
              setOpen(true);
              playSoft(); // 🎵 empieza y seguirá sonando aunque navegue a otras páginas
            }}
            className="rounded-full bg-rose-400 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-rose-200 hover:bg-rose-500 transition"
          >
            Abrir 💌
          </button>
        </div>
      )}

      {/* SOBRE */}
      <motion.div
        initial={false}
        animate={{
          y: open ? -70 : 0,
          scale: open ? 0.86 : 1,
          opacity: open ? 0.75 : 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="relative mx-auto h-56 w-[360px] sm:h-64 sm:w-[420px]"
      >
        <div className="absolute inset-x-10 bottom-2 h-6 rounded-full bg-pink-200/50 blur-xl" />
        <div className="absolute inset-0 rounded-3xl bg-white/70 ring-1 ring-pink-200 shadow-lg shadow-pink-200/40" />

        <motion.div
          animate={{ rotateX: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="absolute left-0 top-0 h-1/2 w-full origin-top overflow-hidden rounded-t-3xl bg-pink-100/80"
          style={{ transformStyle: "preserve-3d" }}
        />

        <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white/80 ring-1 ring-pink-200">
          💗
        </div>
      </motion.div>

      {/* CARTA GRANDE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-10 rounded-3xl border border-pink-200 bg-white/80 p-10 sm:p-16 text-lg leading-relaxed shadow-lg shadow-pink-200/40"
          >
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-neutral-900">{title}</h2>
              <p className="text-sm text-neutral-500 italic mt-2">
                🎧 Te recomiendo leer esto con audífonos
              </p>
            </div>

            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
