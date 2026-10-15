"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { avaliacoes, contato } from "@/content/site";
import { Seta } from "./Visualizador";

export default function Avaliacoes() {
  const [i, setI] = useState(0);
  const atual = avaliacoes[i];
  const ir = (d: number) => setI((v) => (v + d + avaliacoes.length) % avaliacoes.length);

  return (
    <section id="avaliacoes" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <p className="font-display text-[clamp(4rem,8vw,7rem)] leading-none tracking-[-0.04em]">5,0</p>
          <div className="mt-3 flex gap-1 text-estencil" aria-label="5 de 5 estrelas">
            {Array.from({ length: 5 }).map((_, k) => (
              <svg key={k} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M10 1.5 L12.5 7.2 L18.6 7.7 L14 11.8 L15.4 17.8 L10 14.6 L4.6 17.8 L6 11.8 L1.4 7.7 L7.5 7.2 Z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <p className="mt-4 text-grafite">70 avaliações no Google</p>
          <a
            href={contato.avaliacoesGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className="link-traco mt-6 inline-block pb-0.5 text-[0.95rem]"
          >
            Ler todas as avaliações
          </a>
        </div>

        <figure className="lg:col-span-8 lg:col-start-5">
          <div className="relative min-h-[17rem] sm:min-h-[15rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={atual.nome}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(1.6rem,3vw,2.7rem)] leading-[1.18] tracking-[-0.015em]"
              >
                “{atual.texto}”
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-tinta/15 pt-6">
            <span>
              <span className="block">{atual.nome}</span>
              <span className="text-sm text-grafite">Avaliação no Google, {atual.quando}</span>
            </span>
            <span className="flex items-center gap-4">
              <span className="text-sm tabular-nums text-grafite" aria-live="polite">
                {i + 1} de {avaliacoes.length}
              </span>
              <button
                type="button"
                onClick={() => ir(-1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-tinta/25 transition-colors hover:bg-tinta hover:text-parede"
                aria-label="Avaliação anterior"
              >
                <Seta direcao="esquerda" />
              </button>
              <button
                type="button"
                onClick={() => ir(1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-tinta/25 transition-colors hover:bg-tinta hover:text-parede"
                aria-label="Próxima avaliação"
              >
                <Seta direcao="direita" />
              </button>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
