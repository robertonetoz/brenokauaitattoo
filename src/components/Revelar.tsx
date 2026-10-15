"use client";

import { motion, useReducedMotion } from "motion/react";

/*
  Revela uma imagem de baixo para cima, como o filme plástico saindo da pele.
  Quem observa a tela é o contêiner externo: um elemento 100% recortado
  nunca conta como visível para o navegador, então o recorte fica por dentro.
  O contêiner precisa de posição e tamanho próprios (relative + aspect-*).
*/
export default function Revelar({
  children,
  className,
  atraso = 0,
}: {
  children: React.ReactNode;
  className?: string;
  atraso?: number;
}) {
  const reduzir = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduzir ? "visivel" : "oculto"}
      whileInView="visivel"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          oculto: { clipPath: "inset(100% 0% 0% 0%)" },
          visivel: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.2, delay: atraso, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
