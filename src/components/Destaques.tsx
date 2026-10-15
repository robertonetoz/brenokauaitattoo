"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { destaques, type Destaque, type Slide } from "@/content/site";
import Esboco from "./Esboco";
import Portal from "./Portal";
import { liberarRolagem, travarRolagem } from "./RolagemSuave";

const DURACAO_TEXTO = 6500;
const DURACAO_IMAGEM = 5000;

// destaques com slides abrem aqui no site; os outros vão direto para o Instagram
const noSite = destaques.filter((d) => d.slides.length > 0);

export default function Destaques() {
  const [aberto, setAberto] = useState<number | null>(null);
  // cada abertura ganha uma chave nova, para não reaproveitar um story que ainda está saindo
  const [sessao, setSessao] = useState(0);
  const origem = useRef<HTMLButtonElement | null>(null);

  const fechar = useCallback(() => {
    setAberto(null);
    origem.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section id="destaques" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.03em]">
            Destaques
          </h2>
          <p className="mt-5 max-w-[26rem] text-grafite">
            O que as pessoas dizem, como as tatuagens ficam depois de cicatrizadas, como é o atendimento e a mentoria
            para tatuadores.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 lg:col-span-7">
          {destaques.map((d) => (
            <li key={d.id} className="flex justify-center">
              {d.slides.length === 0 ? (
                <a
                  href={d.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-4"
                  aria-label={`Abrir destaque ${d.nome} no Instagram`}
                >
                  <Anel destaque={d} />
                  <span className="font-display text-lg italic xl:text-xl">{d.nome}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    origem.current = e.currentTarget;
                    setSessao((s) => s + 1);
                    setAberto(noSite.indexOf(d));
                  }}
                  className="group flex flex-col items-center gap-4"
                  aria-label={`Abrir destaque ${d.nome}`}
                >
                  <Anel destaque={d} />
                  <span className="font-display text-lg italic xl:text-xl">{d.nome}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Portal>
        <AnimatePresence>
          {aberto !== null && <Stories key={sessao} inicio={aberto} aoFechar={fechar} />}
        </AnimatePresence>
      </Portal>
    </section>
  );
}

function Anel({ destaque, pequeno = false }: { destaque: Destaque; pequeno?: boolean }) {
  const tamanho = pequeno ? "h-9 w-9" : "h-[7.5rem] w-[7.5rem] sm:h-[6.75rem] sm:w-[6.75rem] xl:h-[8.5rem] xl:w-[8.5rem]";
  return (
    <span className={`relative block ${tamanho}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-estencil" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r="48.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={pequeno ? 3 : 1}
          vectorEffect={pequeno ? undefined : "non-scaling-stroke"}
          className={pequeno ? "" : "origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90"}
          strokeDasharray={pequeno ? undefined : "1 3"}
        />
      </svg>
      <span className={`absolute overflow-hidden rounded-full bg-parede-2 ${pequeno ? "inset-[3px]" : "inset-[7px]"}`}>
        {destaque.capa.src ? (
          <Image
            src={destaque.capa.src}
            alt=""
            fill
            sizes="140px"
            className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span className={`absolute inset-0 grid place-items-center text-tinta ${pequeno ? "p-1.5" : "p-5"}`}>
            <Esboco motivo={destaque.capa.motivo} animar={pequeno ? false : "vista"} className="h-full w-full" />
          </span>
        )}
      </span>
    </span>
  );
}

function Stories({ inicio, aoFechar }: { inicio: number; aoFechar: () => void }) {
  const [grupo, setGrupo] = useState(inicio);
  const [slide, setSlide] = useState(0);
  const [progresso, setProgressoEstado] = useState(0);
  const progressoRef = useRef(0);
  const setProgresso = useCallback((p: number) => {
    progressoRef.current = p;
    setProgressoEstado(p);
  }, []);
  const apertouEm = useRef(0);
  const [pausado, setPausado] = useState(false);
  const [mudo, setMudo] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const fecharBtn = useRef<HTMLButtonElement>(null);

  const destaque = noSite[grupo];
  const atual: Slide = destaque.slides[slide];

  const avancar = useCallback(() => {
    setProgresso(0);
    if (slide < destaque.slides.length - 1) setSlide((s) => s + 1);
    else if (grupo < noSite.length - 1) {
      setGrupo((g) => g + 1);
      setSlide(0);
    } else aoFechar();
  }, [slide, grupo, destaque.slides.length, aoFechar, setProgresso]);

  const voltar = useCallback(() => {
    setProgresso(0);
    if (slide > 0) setSlide((s) => s - 1);
    else if (grupo > 0) {
      setGrupo((g) => g - 1);
      setSlide(noSite[grupo - 1].slides.length - 1);
    }
  }, [slide, grupo, setProgresso]);

  // trava a rolagem enquanto os stories estão abertos
  useEffect(() => {
    travarRolagem();
    fecharBtn.current?.focus();
    return () => liberarRolagem();
  }, []);

  const acoes = useRef({ avancar, voltar, aoFechar });
  useEffect(() => {
    acoes.current = { avancar, voltar, aoFechar };
  });

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") acoes.current.aoFechar();
      if (e.key === "ArrowRight") acoes.current.avancar();
      if (e.key === "ArrowLeft") acoes.current.voltar();
      if (e.key === " ") {
        e.preventDefault();
        setPausado((p) => !p);
      }
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, []);

  // relógio dos slides de texto e imagem
  useEffect(() => {
    if (atual.tipo === "video" || pausado) return;
    const total = atual.tipo === "texto" ? DURACAO_TEXTO : DURACAO_IMAGEM;
    let quadro = 0;
    let ultimo = performance.now();
    let decorrido = progressoRef.current * total;
    const passo = (agora: number) => {
      decorrido += agora - ultimo;
      ultimo = agora;
      const p = Math.min(1, decorrido / total);
      setProgresso(p);
      if (p >= 1) acoes.current.avancar();
      else quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [atual, pausado, setProgresso]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (pausado) v.pause();
    else v.play().catch(() => setMudo(true));
  }, [pausado, atual, mudo]);

  return (
    <motion.div
      className="on-dark fixed inset-0 z-[80] flex items-center justify-center bg-tinta/95 text-parede backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Destaque ${destaque.nome}`}
      onClick={aoFechar}
    >
      <motion.div
        className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-carvao sm:h-[min(88svh,860px)] sm:w-auto sm:aspect-[9/16] sm:rounded-[10px]"
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* conteúdo */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${grupo}-${slide}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {atual.tipo === "texto" && (
              <div className="flex h-full flex-col justify-center px-8 pb-32 pt-24 sm:px-10">
                <Esboco motivo="lirio" animar="montagem" className="absolute -right-10 bottom-0 h-[55%] w-[60%] text-parede/15" />
                {atual.titulo && <p className="mb-6 font-display text-lg italic text-estencil-claro">{atual.titulo}</p>}
                <p className="relative font-display text-[clamp(1.5rem,3.2vh,2.1rem)] leading-[1.22] tracking-[-0.01em]">
                  {atual.assinatura ? `“${atual.texto}”` : atual.texto}
                </p>
                {atual.assinatura && <p className="relative mt-6 text-sm text-parede/60">{atual.assinatura}, no Google</p>}
              </div>
            )}
            {atual.tipo === "imagem" &&
              (atual.src ? (
                <Image src={atual.src} alt={atual.legenda ?? ""} fill sizes="(min-width: 640px) 480px, 100vw" className="object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-parede-2 p-12 text-tinta">
                  <Esboco motivo={atual.motivo} animar="montagem" className="h-[70%] w-full" />
                </div>
              ))}
            {atual.tipo === "video" && (
              <video
                ref={video}
                src={atual.src}
                autoPlay
                playsInline
                muted={mudo}
                className="absolute inset-0 h-full w-full object-cover"
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (v.duration) setProgresso(v.currentTime / v.duration);
                }}
                onEnded={() => acoes.current.avancar()}
              />
            )}
            {atual.tipo !== "texto" && atual.legenda && (
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta/80 to-transparent px-6 pb-32 pt-16 font-display text-lg italic">
                {atual.legenda}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* toque: esquerda volta, direita avança, segurar pausa */}
        <div className="absolute inset-0 z-10 flex" aria-hidden="true">
          <div
            className="h-full w-[32%]"
            onPointerDown={() => {
              apertouEm.current = performance.now();
              setPausado(true);
            }}
            onPointerUp={() => setPausado(false)}
            onPointerLeave={() => setPausado(false)}
            onClick={() => performance.now() - apertouEm.current < 280 && voltar()}
          />
          <div
            className="h-full flex-1"
            onPointerDown={() => {
              apertouEm.current = performance.now();
              setPausado(true);
            }}
            onPointerUp={() => setPausado(false)}
            onPointerLeave={() => setPausado(false)}
            onClick={() => performance.now() - apertouEm.current < 280 && avancar()}
          />
        </div>

        {/* barras e cabeçalho */}
        <div className="relative z-20 bg-gradient-to-b from-tinta/60 to-transparent px-3 pb-6 pt-3">
          <div className="flex gap-1">
            {destaque.slides.map((_, i) => (
              <span key={i} className="h-[2px] flex-1 overflow-hidden rounded-full bg-parede/25">
                <span
                  className="block h-full bg-parede"
                  style={{ width: `${i < slide ? 100 : i === slide ? progresso * 100 : 0}%` }}
                />
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Anel destaque={destaque} pequeno />
              <span className="text-sm">{destaque.nome}</span>
            </div>
            <div className="flex items-center gap-1">
              {atual.tipo === "video" && (
                <button type="button" onClick={() => setMudo((m) => !m)} className="px-2 py-1 text-xs text-parede/80">
                  {mudo ? "Ativar som" : "Sem som"}
                </button>
              )}
              <button type="button" onClick={() => setPausado((p) => !p)} className="px-2 py-1 text-xs text-parede/80">
                {pausado ? "Continuar" : "Pausar"}
              </button>
              <button ref={fecharBtn} type="button" onClick={aoFechar} className="px-2 py-1 text-sm">
                Fechar
              </button>
            </div>
          </div>
        </div>

        {/* ação principal do destaque e o atalho para o destaque completo no Instagram */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 px-6 pb-5">
          <a
            href={destaque.acao?.href ?? destaque.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-parede px-6 py-3 text-[0.9rem] text-tinta transition-colors hover:bg-estencil hover:text-parede"
          >
            {destaque.acao?.rotulo ?? "Ver destaque completo no Instagram"}
          </a>
          {destaque.acao && (
            <a
              href={destaque.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-traco pb-0.5 text-[0.8rem] text-parede/80"
            >
              Ver destaque completo no Instagram
            </a>
          )}
        </div>

        <p className="sr-only" aria-live="polite">
          {destaque.nome}, {slide + 1} de {destaque.slides.length}
        </p>
      </motion.div>

      {/* navegação entre destaques no desktop */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between px-8 sm:flex">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            voltar();
          }}
          className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-parede/25 transition-colors hover:bg-parede hover:text-tinta"
          aria-label="Anterior"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M20 12 H5 M11 6 L5 12 L11 18" fill="none" stroke="currentColor" strokeWidth={1.2} />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            avancar();
          }}
          className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-parede/25 transition-colors hover:bg-parede hover:text-tinta"
          aria-label="Próximo"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth={1.2} />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
