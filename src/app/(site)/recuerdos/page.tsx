import CollageGallery from "@/components/CollageGallery";
import { recuerdos } from "@/data/recuerdos";

export default function RecuerdosPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-pink-200 bg-white/70 p-8 shadow-lg shadow-pink-200/40">
        <h2 className="text-2xl font-semibold text-neutral-900">Recuerdos 📸</h2>
        <p className="mt-2 text-neutral-600">
          Un espacio para nuestras fotos mi amor… para mirarlas cuando nos extrañemos.
        </p>
      </div>

      <CollageGallery items={recuerdos} />
    </section>
  );
}
