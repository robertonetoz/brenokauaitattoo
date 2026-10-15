"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { contato, estilos, trabalhos, type Estilo } from "@/content/site";
import Quadro from "./Quadro";
import Visualizador from "./Visualizador";

type Filtro = "Todos" | Estilo | "Vídeos";
const filtros: Filtro[] = ["Todos", ...estilos, "Vídeos"];

export default function Trabalhos() {
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const [aberto, setAberto] = useState<number | null>(null);

  const lista = useMemo(() => {
    if (filtro === "Todos") return trabalhos;
    if (filtro === "Vídeos") return trabalhos.filter((t) => t.tipo === "video");
    return trabalhos.filter((t) => t.estilo === filtro);
  }, [filtro]);

  return (
    <section id="trabalhos" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.03em]">
            Trabalhos
          </h2>
          <p className="mt-5 max-w-[30rem] text-grafite">
            Uma seleção do que já passou pela agulha. Toque em qualquer peça para ver de perto.
          </p>
        </div>

        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="Filtrar por estilo">
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {filtros.map((f) => {
              const ativo = f === filtro;
              return (
                <li key={f}>
                  <button
                    type="button"
                    aria-pressed={ativo}
                    onClick={() => setFiltro(f)}
                    className={`relative whitespace-nowrap rounded-full border px-4 py-2 text-[0.88rem] transition-colors duration-300 ${
                      ativo ? "border-tinta text-parede" : "border-tinta/20 hover:border-tinta/60"
                    }`}
                  >
                    {ativo && (
                      <motion.span
                        layoutId="filtro-ativo"
                        className="absolute inset-0 -z-0 rounded-full bg-tinta"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative">{f}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={filtro}
          className="mt-14 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {lista.map((t, i) => (
            <li key={t.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setAberto(i)}
                className="group block w-full text-left"
                aria-label={`Ver ${t.legenda}`}
              >
                <Quadro
                  item={t}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.985]"
                />
                <span className="mt-2.5 flex items-baseline justify-between gap-3 text-[0.82rem]">
                  <span>{t.legenda}</span>
                  <span className="hidden text-grafite sm:inline">{t.estilo}</span>
                </span>
              </button>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <div className="mt-14 flex justify-center">
        <a
          href={contato.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-tinta px-7 py-3.5 text-[0.95rem] transition-colors duration-300 hover:bg-tinta hover:text-parede"
        >
          Ver mais no Instagram
        </a>
      </div>

      <Visualizador itens={lista} indice={aberto} aoFechar={() => setAberto(null)} aoMudar={setAberto} />
    </section>
  );
}
