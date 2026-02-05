import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import MusicProvider from "@/components/MusicProvider";
import MusicControls from "@/components/MusicControls";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MusicProvider>
      <div className="min-h-dvh text-neutral-900">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-100/60 via-rose-50/60 to-amber-50/70" />
          <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-pink-300/20 blur-3xl" />
          <div className="absolute right-[-120px] top-[20%] h-[320px] w-[320px] rounded-full bg-rose-200/25 blur-3xl" />
        </div>

        <Navbar />

        <main className="mx-auto max-w-4xl px-6 py-10">
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
        <MusicControls />
      </div>
    </MusicProvider>
  );
}
