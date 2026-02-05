import Countdown from "@/components/Countdown";
import SurpriseBox from "@/components/SurpriseBox";
import GuessGame from "@/components/GuessGame";
import VideoGift from "@/components/VideoGift";
import { quiz } from "@/data/quiz";

export default function SorpresaPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-pink-200 bg-white/70 p-8 shadow-lg shadow-pink-200/40">
        <h2 className="text-2xl font-semibold text-neutral-900">Sorpresa 🎁</h2>
        <p className="mt-2 text-neutral-600">
          Esta parte es para que sonrías un ratito.
        </p>
      </div>

      <Countdown />
      <SurpriseBox />
      <GuessGame questions={quiz} />
      <VideoGift />
    </section>
  );
}
