"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { servicos } from "@/content/site";
import Esboco from "./Esboco";

export default function Estilos() {
  const [ativo, setAtivo] = useState(0);
  const atual = servicos.estilos[ativo];

  return (
    <section id="estilos" className="on-dark relative bg-tinta text-parede">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-4 py-24 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-36">
        <div className="lg:col-span-7">
          <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.03em]">
            Estilos
          </h2>
          <p className="mt-5 max-w-[28rem] text-parede/60">
            O traço é sempre fino e o desenho é sempre seu. Passe pelos estilos para ver como cada um nasce no papel.
          </p>

          <ul className="mt-14 border-t border-parede/15">
            {servicos.estilos.map((s, i) => (
              <li key={s.nome} className="border-b border-parede/15">
                <button
                  type="button"
                  onMouseEnter={() => setAtivo(i)}
                  onFocus={() => setAtivo(i)}
                  onClick={() => setAtivo(i)}
                  aria-pressed={ativo === i}
                  className="group flex w-full flex-col gap-1 py-5 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span
                    className={`font-display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em] transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      ativo === i ? "translate-x-2 text-parede" : "text-parede/45 group-hover:text-parede/80"
                    }`}
                  >
                    {s.nome}
                  </span>
                  <span
                    className={`max-w-[18rem] text-[0.9rem] leading-snug transition-colors duration-500 sm:text-right ${
                      ativo === i ? "text-parede/80" : "text-parede/35"
                    }`}
                  >
                    {s.texto}
                  </span>
                </button>
                {/* no celular o esboço abre logo abaixo do estilo tocado */}
                <AnimatePresence initial={false}>
                  {ativo === i && (
                    <motion.div
                      className="overflow-hidden lg:hidden"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="grid h-52 place-items-center pb-6 text-parede">
                        <Esboco motivo={s.motivo} animar="montagem" duracao={1.4} className="h-full w-full" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="mt-16">
            <h3 className="font-display text-2xl italic">No estúdio</h3>
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {servicos.estudio.map((s) => (
                <li key={s.nome}>
                  <p>{s.nome}</p>
                  <p className="mt-1 text-[0.9rem] leading-snug text-parede/55">{s.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[3/4] w-full border border-parede/15">
              <AnimatePresence mode="wait">
                <motion.div
                  key={atual.nome}
                  className="absolute inset-0 grid place-items-center p-12 text-parede"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Esboco motivo={atual.motivo} animar="montagem" duracao={1.4} className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 flex justify-between text-sm text-parede/55">
              <span>Esboço</span>
              <span className="font-display italic text-parede">{atual.nome}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
