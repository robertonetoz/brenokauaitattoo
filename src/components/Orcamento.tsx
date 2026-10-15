"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { contato, mensagens, passos } from "@/content/site";
import Revelar from "./Revelar";

export default function Orcamento() {
  const video = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const reduzir = useReducedMotion();

  const tocar = () => {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    v.play();
    setTocando(true);
  };

  return (
    <section id="orcamento" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Revelar className="relative mx-auto aspect-[9/16] w-full max-w-[400px] overflow-hidden bg-carvao lg:sticky lg:top-24">
            <video
              ref={video}
              src="/media/orcamento.mp4#t=3"
              playsInline
              preload="metadata"
              controls={tocando}
              onPause={(e) => e.currentTarget.ended && setTocando(false)}
              className="absolute inset-0 h-full w-full object-cover"
              aria-label="Vídeo: como fazer seu orçamento com o Breno"
            />
            {!tocando && (
              <button
                type="button"
                onClick={tocar}
                className="group absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-tinta/75 via-tinta/10 to-transparent p-6 text-parede"
              >
                <span className="mb-auto mt-auto grid h-20 w-20 place-items-center rounded-full border border-parede/70 backdrop-blur-[2px] transition-transform duration-500 group-hover:scale-110">
                  <svg viewBox="0 0 12 12" className="ml-1 h-5 w-5" aria-hidden="true">
                    <path d="M2 1.2 L10.4 6 L2 10.8 Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="font-display text-xl italic">Assista ao vídeo completo</span>
              </button>
            )}
          </Revelar>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="font-display text-[clamp(2.6rem,5.6vw,5.4rem)] font-normal leading-[0.98] tracking-[-0.03em]">
            Como fazer seu orçamento
          </h2>
          <p className="mt-8 max-w-[32rem] font-display text-[clamp(1.25rem,1.8vw,1.6rem)] italic leading-snug">
            Cada etapa é pensada pra garantir a sua experiência de forma 100% única.
          </p>

          <ol className="mt-16 grid gap-0 border-t border-tinta/15">
            {passos.map((p, i) => (
              <motion.li
                key={p.titulo}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-tinta/15 py-8 xl:grid-cols-[5rem_1fr_1.4fr] xl:gap-x-8"
                initial={reduzir ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-display text-3xl text-estencil" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="font-display text-[1.6rem] leading-tight">{p.titulo}</h3>
                <p className="col-start-2 mt-2 max-w-[34rem] text-carvao xl:col-start-3 xl:mt-0">{p.texto}</p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={contato.whatsapp(mensagens.orcamento)}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-full bg-tinta px-7 py-3.5 text-[0.95rem] text-parede transition-colors duration-300 hover:bg-estencil"
            >
              Contar minha ideia no WhatsApp
            </a>
            <p className="text-grafite">Conte comigo pra eternizar sua ideia 🤍</p>
          </div>
        </div>
      </div>
    </section>
  );
}
