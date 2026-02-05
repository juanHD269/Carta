"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type MusicAPI = {
  playSoft: () => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  isPlaying: boolean;
  volume: number;
  hasStarted: boolean;
};

const MusicCtx = createContext<MusicAPI | null>(null);

export function useMusic() {
  const ctx = useContext(MusicCtx);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}

export default function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.25);
  const [hasStarted, setHasStarted] = useState(false);

  // ✅ IMPORTANTE: desbloqueo para producción (Vercel)
  const [isUnlocked, setIsUnlocked] = useState(false);

  // listeners del audio + volumen inicial
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVol = () => setVolumeState(a.volume);

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("volumechange", onVol);

    a.volume = volume;

    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("volumechange", onVol);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Desbloquear audio con la primera interacción real del usuario
  useEffect(() => {
    const unlock = async () => {
      const a = audioRef.current;
      if (!a) return;

      try {
        // Intento silencioso (el navegador ahora permite play)
        a.volume = 0;
        await a.play();
        a.pause();
        a.currentTime = 0;
        setIsUnlocked(true);
      } catch {
        // Si falla, no pasa nada: el próximo click lo intentará igual
      } finally {
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
      }
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const api = useMemo<MusicAPI>(() => {
    const fadeTo = (target: number, ms = 900) => {
      const a = audioRef.current;
      if (!a) return;

      const start = a.volume;
      const steps = 30;
      const stepMs = ms / steps;
      let i = 0;

      const t = window.setInterval(() => {
        i += 1;
        const next = start + ((target - start) * i) / steps;
        a.volume = Math.max(0, Math.min(1, next));
        if (i >= steps) window.clearInterval(t);
      }, stepMs);
    };

    const playInternal = async (soft: boolean) => {
      const a = audioRef.current;
      if (!a) return;

      // ✅ si aún no está desbloqueado, no forzamos (evita fallas silenciosas)
      if (!isUnlocked) return;

      setHasStarted(true);

      if (soft) {
        a.volume = 0.05;
        try {
          await a.play();
          fadeTo(0.25, 900);
        } catch {
          // si falla, el usuario puede darle Play en el controlador
        }
      } else {
        a.volume = Math.max(0, Math.min(1, volume));
        a.play().catch(() => {});
      }
    };

    return {
      playSoft: () => {
        void playInternal(true);
      },
      play: () => {
        void playInternal(false);
      },
      pause: () => {
        const a = audioRef.current;
        if (!a) return;
        a.pause();
      },
      toggle: () => {
        const a = audioRef.current;
        if (!a) return;

        setHasStarted(true);

        if (a.paused) {
          if (!isUnlocked) return;
          a.play().catch(() => {});
        } else {
          a.pause();
        }
      },
      setVolume: (v: number) => {
        const a = audioRef.current;
        const next = Math.max(0, Math.min(1, v));
        setVolumeState(next);
        if (!a) return;
        a.volume = next;
      },
      isPlaying,
      volume,
      hasStarted,
    };
  }, [isPlaying, volume, hasStarted, isUnlocked]);

  return (
    <MusicCtx.Provider value={api}>
      <audio ref={audioRef} src="/music/thinking.mp3" preload="auto" loop />
      {children}
    </MusicCtx.Provider>
  );
}
