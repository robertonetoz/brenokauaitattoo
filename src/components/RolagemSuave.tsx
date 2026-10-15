"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let lenis: Lenis | null = null;
let travas = 0;

export function travarRolagem() {
  travas += 1;
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function liberarRolagem() {
  travas = Math.max(0, travas - 1);
  if (travas > 0) return;
  lenis?.start();
  document.documentElement.style.overflow = "";
}

export function rolarPara(alvo: string) {
  const el = document.querySelector(alvo);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -8 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function RolagemSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.11, anchors: { offset: -8 }, autoRaf: true });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
