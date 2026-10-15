"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { contato, estudio } from "@/content/site";
import Quadro from "./Quadro";
import Visualizador from "./Visualizador";

const larguras: Record<string, string> = {
  "1/1": "w-[78vw] sm:w-[46vw] lg:w-[34vw]",
  "3/4": "w-[64vw] sm:w-[36vw] lg:w-[25vw]",
  "4/5": "w-[68vw] sm:w-[38vw] lg:w-[27vw]",
  "9/16": "w-[52vw] sm:w-[30vw] lg:w-[20vw]",
  "2/3": "w-[60vw] sm:w-[34vw] lg:w-[23vw]",
};

export default function Estudio() {
  const secao = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLUListElement>(null);
  const [distancia, setDistancia] = useState(0);
  const [aberto, setAberto] = useState<number | null>(null);
  const reduzir = useReducedMotion();
  const fechar = useCallback(() => setAberto(null), []);

  useEffect(() => {
    const medir = () => {
      const t = trilho.current;
      if (!t) return;
      setDistancia(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  const { scrollYProgress } = useScroll({ target: secao, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distancia]);
  const fixo = !reduzir;

  return (
    <section
      id="estudio"
      ref={secao}
      className="on-dark relative bg-tinta text-parede"
      style={fixo ? { height: `calc(100svh + ${distancia}px)` } : undefined}
    >
      <div className={`${fixo ? "sticky top-0 h-[100svh]" : ""} flex flex-col justify-center overflow-hidden py-20`}>
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
          <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.03em]">
            O estúdio
          </h2>
          <p className="max-w-[24rem] text-parede/60 sm:text-right">
            Um espaço calmo e confortável, pensado pra você relaxar durante a sessão. {contato.endereco}, Uberlândia.
          </p>
        </div>

        <motion.ul
          ref={trilho}
          style={fixo ? { x } : undefined}
          className={`mt-12 flex w-max items-end gap-4 px-4 sm:gap-6 sm:px-8 lg:px-12 ${
            fixo ? "" : "no-scrollbar max-w-full overflow-x-auto"
          }`}
        >
          {estudio.map((e, i) => (
            <li key={e.id} className={`shrink-0 ${larguras[e.proporcao]} ${i % 2 ? "self-start" : ""}`}>
              <button type="button" onClick={() => setAberto(i)} className="block w-full text-left" aria-label={`Ver ${e.legenda}`}>
                <Quadro item={e} tom="escuro" sizes="(min-width: 1024px) 34vw, 78vw" />
                <span className="mt-3 block font-display text-lg italic text-parede/80">{e.legenda}</span>
              </button>
            </li>
          ))}
        </motion.ul>
      </div>

      <Visualizador itens={estudio} indice={aberto} aoFechar={fechar} aoMudar={setAberto} />
    </section>
  );
}
