"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Midia } from "@/content/site";
import { semAutoplay } from "./economia";
import Esboco from "./Esboco";

const proporcoes: Record<Midia["proporcao"], string> = {
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "9/16": "aspect-[9/16]",
  "2/3": "aspect-[2/3]",
};

/* Uma peça da galeria: foto, vídeo ou, enquanto não houver mídia, o esboço em traço fino. */
export default function Quadro({
  item,
  sizes,
  className = "",
  tom = "claro",
}: {
  item: Midia;
  sizes: string;
  className?: string;
  tom?: "claro" | "escuro";
}) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v || semAutoplay()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden ${proporcoes[item.proporcao]} ${
        tom === "claro" ? "bg-parede-2" : "bg-carvao"
      } ${className}`}
    >
      {item.tipo === "imagem" && item.src ? (
        <Image src={item.src} alt={item.alt} fill sizes={sizes} className="object-cover" />
      ) : item.tipo === "video" && item.src ? (
        <video
          ref={video}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className={`absolute inset-0 grid place-items-center p-[14%] ${tom === "claro" ? "text-tinta" : "text-parede"}`}>
          <Esboco motivo={item.motivo} className="h-full w-full" />
          <span className="sr-only">{item.alt}</span>
        </div>
      )}

      {item.tipo === "video" && (
        <span
          className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-tinta/70 text-parede backdrop-blur-sm"
          aria-hidden="true"
        >
          <svg viewBox="0 0 12 12" className="ml-0.5 h-3 w-3">
            <path d="M2 1.2 L10.4 6 L2 10.8 Z" fill="currentColor" />
          </svg>
        </span>
      )}
    </div>
  );
}
