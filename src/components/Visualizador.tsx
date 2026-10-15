"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import type { Midia } from "@/content/site";
import Esboco from "./Esboco";
import Portal from "./Portal";
import { liberarRolagem, travarRolagem } from "./RolagemSuave";

/* Tela cheia para ver um trabalho de perto. Setas e Esc no teclado. */
export default function Visualizador({
  itens,
  indice,
  aoFechar,
  aoMudar,
}: {
  itens: Midia[];
  indice: number | null;
  aoFechar: () => void;
  aoMudar: (i: number) => void;
}) {
  const fechar = useRef<HTMLButtonElement>(null);
  const aberto = indice !== null;
  const item = aberto ? itens[indice] : null;

  const ir = useCallback(
    (delta: number) => {
      if (indice === null) return;
      aoMudar((indice + delta + itens.length) % itens.length);
    },
    [indice, itens.length, aoMudar],
  );

  const acoes = useRef({ aoFechar, ir });
  useEffect(() => {
    acoes.current = { aoFechar, ir };
  });

  useEffect(() => {
    if (!aberto) return;
    travarRolagem();
    const anterior = document.activeElement as HTMLElement | null;
    fechar.current?.focus();
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") acoes.current.aoFechar();
      if (e.key === "ArrowRight") acoes.current.ir(1);
      if (e.key === "ArrowLeft") acoes.current.ir(-1);
    };
    window.addEventListener("keydown", tecla);
    return () => {
      window.removeEventListener("keydown", tecla);
      liberarRolagem();
      anterior?.focus({ preventScroll: true });
    };
  }, [aberto]);

  return (
    <Portal>
    <AnimatePresence>
      {item && (
        <motion.div
          className="on-dark fixed inset-0 z-[70] flex flex-col bg-tinta/95 text-parede backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.legenda}
        >
          <div className="flex items-center justify-between px-4 py-4 text-sm sm:px-8">
            <span className="text-parede/60">
              {indice! + 1} de {itens.length}
            </span>
            <button ref={fechar} type="button" onClick={aoFechar} className="-mr-2 p-2">
              Fechar
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={aoFechar}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={item.id}
                className="flex h-full max-h-full w-full flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-full max-h-[78svh] w-full">
                  {item.tipo === "imagem" && item.src ? (
                    <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
                  ) : item.tipo === "video" && item.src ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      autoPlay
                      playsInline
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center p-8">
                      <Esboco motivo={item.motivo} animar="montagem" className="h-full max-h-[60svh] w-full" />
                    </div>
                  )}
                </div>
                <figcaption className="mt-5 font-display text-lg italic">{item.legenda}</figcaption>
              </motion.figure>
            </AnimatePresence>

            {itens.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    ir(-1);
                  }}
                  className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-parede/25 transition-colors hover:bg-parede hover:text-tinta sm:left-6"
                  aria-label="Anterior"
                >
                  <Seta direcao="esquerda" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    ir(1);
                  }}
                  className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-parede/25 transition-colors hover:bg-parede hover:text-tinta sm:right-6"
                  aria-label="Próximo"
                >
                  <Seta direcao="direita" />
                </button>
              </>
            )}
          </div>
          <div className="h-6" />
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
}

export function Seta({ direcao }: { direcao: "esquerda" | "direita" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d={direcao === "direita" ? "M4 12 H19 M13 6 L19 12 L13 18" : "M20 12 H5 M11 6 L5 12 L11 18"}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      />
    </svg>
  );
}
