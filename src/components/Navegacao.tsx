"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { contato, mensagens } from "@/content/site";
import { liberarRolagem, travarRolagem } from "./RolagemSuave";

const links = [
  { href: "#trabalhos", rotulo: "Trabalhos" },
  { href: "#estilos", rotulo: "Estilos" },
  { href: "#destaques", rotulo: "Destaques" },
  { href: "#orcamento", rotulo: "Orçamento" },
  { href: "#estudio", rotulo: "Estúdio" },
  { href: "#contato", rotulo: "Contato" },
];

export default function Navegacao() {
  const [rolou, setRolou] = useState(false);
  const [escuro, setEscuro] = useState(false);
  const [aberto, setAberto] = useState(false);

  const { scrollY } = useScroll();
  // a barra troca de tom quando passa por cima das seções pretas
  const conferir = useCallback((y: number) => {
    setRolou(y > 40);
    const escuras = document.querySelectorAll<HTMLElement>("main .on-dark, footer.on-dark");
    setEscuro(
      Array.from(escuras).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 32 && r.bottom >= 32;
      }),
    );
  }, []);
  useMotionValueEvent(scrollY, "change", conferir);
  useEffect(() => {
    const id = requestAnimationFrame(() => conferir(window.scrollY));
    return () => cancelAnimationFrame(id);
  }, [conferir]);

  useEffect(() => {
    if (!aberto) return;
    travarRolagem();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => {
      liberarRolagem();
      window.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,color,border-color] duration-500 ${
          escuro
            ? "on-dark border-parede/10 bg-tinta/75 text-parede backdrop-blur-md"
            : rolou
              ? "border-tinta/10 bg-parede/80 backdrop-blur-md"
              : "border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12" aria-label="Principal">
          <a href="#inicio" className="group flex items-baseline gap-2" aria-label="Breno Kauai, início">
            <span className="font-display text-[1.35rem] leading-none tracking-[-0.01em]">Breno Kauai</span>
            <span className="font-display text-sm italic text-grafite">tatuador</span>
          </a>

          <ul className="hidden items-center gap-7 text-[0.9rem] lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-traco pb-0.5">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={contato.whatsapp(mensagens.orcamento)}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden rounded-full px-5 py-2.5 text-[0.85rem] transition-colors duration-300 hover:bg-estencil hover:text-parede sm:inline-block ${
                escuro ? "bg-parede text-tinta" : "bg-tinta text-parede"
              }`}
            >
              Pedir orçamento
            </a>
            <button
              type="button"
              onClick={() => setAberto(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-label="Abrir menu"
              aria-expanded={aberto}
            >
              <span className="h-px w-6 bg-current" />
              <span className="h-px w-4 self-end bg-current" style={{ marginRight: 8 }} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="on-dark fixed inset-0 z-[60] flex flex-col bg-tinta px-6 pb-10 pt-5 text-parede"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-11 items-center justify-between">
              <span className="font-display text-[1.35rem]">Breno Kauai</span>
              <button type="button" onClick={() => setAberto(false)} className="-mr-2 p-2 text-sm" aria-label="Fechar menu">
                Fechar
              </button>
            </div>
            <ul className="mt-14 flex flex-col gap-3">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a href={l.href} onClick={() => setAberto(false)} className="font-display text-[2.6rem] leading-tight">
                    {l.rotulo}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-4 text-sm text-parede/70">
              <a
                href={contato.whatsapp(mensagens.orcamento)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-parede py-4 text-center text-base text-tinta"
              >
                Pedir orçamento no WhatsApp
              </a>
              <p>
                {contato.endereco}, {contato.bairro}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
