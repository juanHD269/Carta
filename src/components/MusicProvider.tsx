"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

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

    return {
      playSoft: () => {
        const a = audioRef.current;
        if (!a) return;
        setHasStarted(true);
        a.volume = 0.05;
        a.play().then(() => fadeTo(0.25, 900)).catch(() => {});
      },
      play: () => {
        const a = audioRef.current;
        if (!a) return;
        setHasStarted(true);
        a.play().catch(() => {});
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
        if (a.paused) a.play().catch(() => {});
        else a.pause();
      },
      setVolume: (v: number) => {
        const a = audioRef.current;
        if (!a) return;
        const next = Math.max(0, Math.min(1, v));
        a.volume = next;
        setVolumeState(next);
      },
      isPlaying,
      volume,
      hasStarted,
    };
  }, [isPlaying, volume, hasStarted]);

  return (
    <MusicCtx.Provider value={api}>
      <audio ref={audioRef} src="/music/thinking.mp3" preload="auto" loop />
      {children}
    </MusicCtx.Provider>
  );
}