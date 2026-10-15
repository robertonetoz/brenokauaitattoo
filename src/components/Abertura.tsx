"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { contato, mensagens } from "@/content/site";
import Esboco from "./Esboco";

const linhas = ["Eu enxergo", "o que você", "sente."];
const suave = [0.22, 1, 0.36, 1] as const;

export default function Abertura() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yFoto = useTransform(scrollYProgress, [0, 1], ["0%", reduzir ? "0%" : "12%"]);
  const yLirio = useTransform(scrollYProgress, [0, 1], ["0%", reduzir ? "0%" : "-10%"]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative mx-auto grid min-h-[100svh] bg-parede max-w-[1440px] grid-cols-1 gap-y-12 px-4 pb-14 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-x-8 lg:px-12 lg:pb-16 lg:pt-32"
    >
      <div className="relative z-20 flex flex-col justify-between lg:col-span-7">
        <h1 className="font-display text-[clamp(3.4rem,8.4vw,9.25rem)] font-normal leading-[0.9] tracking-[-0.035em]">
          {linhas.map((linha, i) => (
            <span key={linha} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reduzir ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: suave }}
              >
                {linha}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 max-w-[30rem] lg:mt-0"
          initial={reduzir ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: suave }}
        >
          <p className="font-display text-[clamp(1.4rem,2.1vw,1.9rem)] italic leading-snug">
            E transformo em arte aquilo que te habita.
          </p>
          <p className="mt-5 max-w-[26rem] text-grafite">
            Tatuagens em fine line, floral, mandala e pontilhismo delicado, desenhadas uma a uma no meu estúdio em
            Uberlândia.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={contato.whatsapp(mensagens.orcamento)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-tinta px-7 py-3.5 text-[0.95rem] text-parede transition-colors duration-300 hover:bg-estencil"
            >
              Pedir orçamento
            </a>
            <a href="#trabalhos" className="link-traco pb-0.5 text-[0.95rem]">
              Ver trabalhos
            </a>
          </div>
        </motion.div>
      </div>

      <div className="relative lg:col-span-5">
        <motion.div
          style={{ y: yFoto }}
          className="relative ml-auto aspect-[4/5] w-[86%] overflow-hidden bg-parede-2 sm:w-[70%] lg:w-full"
          initial={reduzir ? false : { clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.4, delay: 0.3, ease: suave }}
        >
          <Image
            src="/media/retrato.jpg"
            alt="Retrato de Breno Kauai, tatuador"
            fill
            preload
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="object-cover grayscale"
          />
        </motion.div>

        {/* o lírio sai da parede e entra na foto: com difference ele inverte sobre a camiseta preta */}
        <motion.div
          style={{ y: yLirio }}
          className="pointer-events-none absolute -bottom-6 left-[-6%] z-10 h-[108%] w-[62%] text-white mix-blend-difference sm:left-[4%] lg:-left-[33%] lg:w-[70%]"
        >
          <Esboco motivo="lirio" animar="montagem" atraso={0.9} duracao={2.2} traco={1} className="h-full w-full" />
        </motion.div>

        <motion.p
          className="mt-6 text-right text-sm text-grafite lg:absolute lg:-bottom-2 lg:right-0 lg:mt-0"
          initial={reduzir ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          Nota 5,0 em 70 avaliações no Google
        </motion.p>
      </div>
    </section>
  );
}
