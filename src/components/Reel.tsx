"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { reel } from "@/content/site";
import { semAutoplay } from "./economia";
import Revelar from "./Revelar";

/* O vídeo de apresentação dos trabalhos: toca sem som quando aparece na tela. */
export default function Reel({ className = "" }: { className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [mudo, setMudo] = useState(true);
  const [tocando, setTocando] = useState(false);
  const reduzir = useReducedMotion();

  useEffect(() => {
    const v = video.current;
    if (!v || reduzir || semAutoplay()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduzir]);

  const alternarSom = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !mudo;
    setMudo(!mudo);
    if (v.paused) v.play().catch(() => {});
  };

  const alternarPlay = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <figure className={className}>
      <Revelar className="relative aspect-[9/16] w-full overflow-hidden bg-carvao">
        <video
          ref={video}
          src={`${reel.src}#t=0.1`}
          muted={mudo}
          loop
          playsInline
          preload="metadata"
          aria-label={reel.alt}
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-tinta/70 to-transparent p-3 pt-12 text-[0.8rem] text-parede">
          <button
            type="button"
            onClick={alternarPlay}
            className="rounded-full border border-parede/40 px-3 py-1.5 backdrop-blur-sm transition-colors hover:bg-parede hover:text-tinta"
          >
            {tocando ? "Pausar" : "Assistir"}
          </button>
          <button
            type="button"
            onClick={alternarSom}
            className="rounded-full border border-parede/40 px-3 py-1.5 backdrop-blur-sm transition-colors hover:bg-parede hover:text-tinta"
          >
            {mudo ? "Ativar som" : "Tirar som"}
          </button>
        </div>
      </Revelar>
      <figcaption className="mt-3 font-display text-lg italic">{reel.legenda}</figcaption>
    </figure>
  );
}
