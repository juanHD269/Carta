import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="rounded-3xl border border-pink-200 bg-white/70 p-8 shadow-lg shadow-pink-200/40">
        <p className="text-sm text-neutral-600">Para mi persona favorita</p>

        <h1 className="mt-3 font-[var(--font-dancing)] text-5xl text-neutral-900">
          Feliz 2 meses, mi amor 💕
        </h1>

        <p className="mt-4 text-neutral-600">
          Hice esta página para que tu carta se sienta como un abrazo,
          aunque estemos lejos.
        </p>

        {/* 📸 FOTO PRINCIPAL */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-pink-200 shadow-md shadow-pink-200/30">
          <div className="relative aspect-[4/5] sm:aspect-[16/9]">
            <Image
              src="/photos/inicio.png"
              alt="Nosotros 💖"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/carta"
            className="rounded-2xl bg-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-rose-200 hover:bg-rose-500 transition"
          >
            Abrir mi carta 💌
          </Link>

          <Link
            href="/recuerdos"
            className="rounded-2xl border border-pink-300 bg-white px-5 py-3 text-sm font-semibold text-rose-600 hover:bg-pink-50 transition"
          >
            Ver recuerdos 📸
          </Link>
        </div>
      </div>
    </section>
  );
}
