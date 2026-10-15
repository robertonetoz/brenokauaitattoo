"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

/*
  Uma linha de estêncil que atravessa a página e vai sendo "tatuada"
  conforme a pessoa rola. Passa por baixo das fotos, como se seguisse a pele.
*/
export default function LinhaAgulha({ children }: { children: React.ReactNode }) {
  const caixa = useRef<HTMLDivElement>(null);
  const caminho = useRef<SVGPathElement>(null);
  const ponta = useRef<SVGCircleElement>(null);
  const [tamanho, setTamanho] = useState({ w: 0, h: 0 });
  const reduzir = useReducedMotion();

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const medir = () => setTamanho({ w: el.offsetWidth, h: el.offsetHeight });
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: caixa, offset: ["start 0.75", "end end"] });
  const progresso = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  useMotionValueEvent(progresso, "change", (v) => {
    const p = caminho.current;
    const c = ponta.current;
    if (!p || !c) return;
    const total = p.getTotalLength();
    const pt = p.getPointAtLength(total * v);
    c.setAttribute("cx", String(pt.x));
    c.setAttribute("cy", String(pt.y));
    c.style.opacity = v > 0.002 && v < 0.998 ? "1" : "0";
  });

  const d = gerarCaminho(tamanho.w, tamanho.h);

  return (
    <div ref={caixa} className="relative">
      {tamanho.h > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full text-estencil"
          width={tamanho.w}
          height={tamanho.h}
          viewBox={`0 0 ${tamanho.w} ${tamanho.h}`}
          aria-hidden="true"
        >
          <path d={d} fill="none" stroke="currentColor" strokeOpacity={0.14} strokeWidth={1} strokeDasharray="2 6" />
          <motion.path
            ref={caminho}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.55}
            strokeWidth={1}
            style={{ pathLength: reduzir ? 1 : progresso }}
          />
          {!reduzir && <circle ref={ponta} r={2.5} fill="currentColor" style={{ opacity: 0 }} />}
        </svg>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function gerarCaminho(w: number, h: number) {
  if (!w || !h) return "";
  const segmentos = Math.max(1, Math.round(h / (w < 768 ? 620 : 820)));
  const passo = h / segmentos;
  const margem = w < 768 ? 14 : Math.max(28, w * 0.035);
  const xs = [w - margem, margem];
  let y = 0;
  let d = `M${w * 0.82} 0`;
  let xAnterior = w * 0.82;
  for (let i = 0; i < segmentos; i++) {
    const proxY = y + passo;
    const x = xs[i % 2];
    const meio = (proxY - y) * 0.55;
    d += ` C${xAnterior} ${y + meio} ${x} ${proxY - meio} ${x} ${proxY}`;
    xAnterior = x;
    y = proxY;
  }
  return d;
}
