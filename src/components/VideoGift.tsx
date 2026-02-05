export default function VideoGift() {
  return (
    <div className="rounded-3xl border border-pink-200 bg-white/80 p-10 shadow-lg shadow-pink-200/40">
      <h3 className="text-2xl font-semibold text-neutral-900">Un regalo para ti 🎶</h3>
      <p className="mt-2 text-neutral-600 italic">
        Esto lo grabé con nervios… pero con todo mi corazón.
      </p>

      <div className="mt-6 overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-md shadow-pink-200/30">
        <video
          controls
          playsInline
          preload="metadata"
          className="w-full"
          src="/videos/mi-video.mp4"
        />
      </div>

      <p className="mt-4 text-sm text-neutral-500 italic">
        Léelo, escúchalo, siéntelo… como si estuviera ahí contigo.
      </p>
    </div>
  );
}
