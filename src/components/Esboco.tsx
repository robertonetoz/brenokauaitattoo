"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Motivo } from "@/content/site";
import { desenhos } from "./desenhos";

type Props = {
  motivo: Motivo;
  className?: string;
  /** "vista": desenha quando entra na tela; "montagem": desenha ao carregar; false: estático */
  animar?: "vista" | "montagem" | false;
  atraso?: number;
  duracao?: number;
  traco?: number;
};

export default function Esboco({
  motivo,
  className,
  animar = "vista",
  atraso = 0,
  duracao = 1.6,
  traco = 1,
}: Props) {
  const reduzir = useReducedMotion();
  const d = desenhos[motivo];
  const larguraVB = Number(d.viewBox.split(" ")[2]);
  const svg = useRef<SVGSVGElement>(null);
  // o traço é medido em unidades do desenho; convertemos para ficar sempre com ~1px na tela
  const [escala, setEscala] = useState(larguraVB / 320);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const medir = () => {
      const { width, height } = el.getBoundingClientRect();
      const [, , w, h] = d.viewBox.split(" ").map(Number);
      const s = Math.min(width / w, height / h);
      if (s > 0) setEscala(1 / s);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [d.viewBox]);
  const estatico = !animar || reduzir;
  const passo = Math.min(0.08, 1.2 / d.linhas.length);

  const gatilho =
    animar === "vista"
      ? { whileInView: "visivel", viewport: { once: true, margin: "-10% 0px" } }
      : { animate: "visivel" };

  const conteudo = (
    <>
      {d.linhas.map((linha, i) => (
        <motion.path
          key={i}
          d={linha}
          fill="none"
          stroke="currentColor"
          strokeWidth={traco * escala}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            oculto: { pathLength: 0, opacity: 0 },
            visivel: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { duration: duracao, ease: [0.65, 0, 0.35, 1], delay: atraso + i * passo },
                opacity: { duration: 0.01, delay: atraso + i * passo },
              },
            },
          }}
        />
      ))}
      {d.pontos?.map(([x, y, raio], i) => (
        <motion.circle
          key={`p${i}`}
          cx={x}
          cy={y}
          r={raio}
          fill="currentColor"
          variants={{
            oculto: { opacity: 0 },
            visivel: {
              opacity: 1,
              transition: { duration: 0.5, delay: atraso + duracao * 0.7 + (i % 40) * 0.012 },
            },
          }}
        />
      ))}
    </>
  );

  return (
    <motion.svg
      ref={svg}
      viewBox={d.viewBox}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      initial={estatico ? "visivel" : "oculto"}
      {...(estatico ? { animate: "visivel" } : gatilho)}
    >
      {conteudo}
      {d.espelho ? (
        <g transform={`translate(${d.espelho} 0) scale(-1 1)`}>{conteudo}</g>
      ) : null}
      {d.texto ? (
        <motion.text
          x={d.texto.x}
          y={d.texto.y}
          textAnchor="middle"
          fontSize={d.texto.tamanho}
          fill="currentColor"
          className="font-display"
          fontStyle="italic"
          fontWeight={400}
          variants={{
            oculto: { opacity: 0, y: 6 },
            visivel: { opacity: 1, y: 0, transition: { duration: 1.2, delay: atraso + 0.2 } },
          }}
        >
          {d.texto.valor}
        </motion.text>
      ) : null}
    </motion.svg>
  );
}
