"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/data/quiz";

export default function GuessGame({ questions }: { questions: QuizQuestion[] }) {
  const q = useMemo(() => questions, [questions]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const finished = idx >= q.length;
  const current = q[idx];

  function pick(optionIndex: number) {
    if (picked !== null) return;
    setPicked(optionIndex);
    if (optionIndex === current.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    setIdx((i) => i + 1);
  }

  function restart() {
    setIdx(0);
    setPicked(null);
    setScore(0);
  }

  return (
    <div className="rounded-3xl border border-pink-200 bg-white/70 p-8 shadow-lg shadow-pink-200/40">
      <h3 className="text-xl font-semibold text-neutral-900">Adivina 💞</h3>
      <p className="mt-2 text-neutral-600">Un mini juego rapidito.</p>

      {finished ? (
        <div className="mt-6 rounded-3xl border border-pink-200 bg-white/80 p-6">
          <p className="text-lg text-neutral-800">
            Resultado: <span className="font-semibold">{score}</span> / {q.length}
          </p>
          <button
            onClick={restart}
            className="mt-4 rounded-2xl border border-pink-200 bg-white px-5 py-3 text-sm font-semibold text-rose-600 hover:bg-pink-50 transition"
          >
            Jugar de nuevo 🔁
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 rounded-3xl border border-pink-200 bg-white/80 p-6">
            <div className="text-xs text-neutral-500">
              Pregunta {idx + 1} de {q.length}
            </div>
            <div className="mt-2 text-lg font-semibold text-neutral-900">
              {current.question}
            </div>

            <div className="mt-4 grid gap-3">
              {current.options.map((opt, i) => {
                const locked = picked !== null;
                const isCorrect = locked && i === current.correctIndex;
                const isPicked = locked && i === picked;

                const state =
                  !locked
                    ? "hover:bg-pink-50"
                    : isCorrect
                      ? "bg-emerald-100 border-emerald-200"
                      : isPicked
                        ? "bg-rose-100 border-rose-200"
                        : "opacity-70";

                return (
                  <button
                    key={opt}
                    onClick={() => pick(i)}
                    className={[
                      "rounded-2xl border border-pink-200 bg-white px-4 py-3 text-left text-sm text-neutral-800 transition",
                      state,
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="mt-4 text-sm text-neutral-600">
                {picked === current.correctIndex ? "✅ Correcto" : "❌ Casi…"}
                {current.explanation ? ` — ${current.explanation}` : ""}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={next}
              disabled={picked === null}
              className="rounded-2xl bg-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-rose-200 hover:bg-rose-500 disabled:opacity-40 transition"
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
