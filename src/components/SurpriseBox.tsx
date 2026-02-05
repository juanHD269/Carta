"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SurpriseBox() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-pink-200 bg-white/70 p-8 shadow-lg shadow-pink-200/40">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-neutral-900">Caja sorpresa 🎁</h3>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-rose-400 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-rose-200 hover:bg-rose-500 transition"
        >
          {open ? "Cerrar" : "Abrir"} ✨
        </button>
      </div>

      <p className="mt-2 text-neutral-600">Toca “Abrir” para descubrir algo bonito.</p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mt-6 rounded-3xl border border-pink-200 bg-white/80 p-6"
          >
            <p className="text-lg leading-relaxed text-neutral-800">
              Si estás leyendo esto, es porque te amo más de lo que sabes 💖
            </p>

            <ul className="mt-4 list-disc pl-6 text-neutral-700">
              <li>Gracias por existir mi amor</li>
              <li>Te pienso cada momento de mi día</li>
              <li>Te amo más de lo que puedo expresar</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
