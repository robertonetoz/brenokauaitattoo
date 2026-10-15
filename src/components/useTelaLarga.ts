"use client";

import { useSyncExternalStore } from "react";

const consulta = "(min-width: 1024px)";

function assinar(aviso: () => void) {
  const mq = window.matchMedia(consulta);
  mq.addEventListener("change", aviso);
  return () => mq.removeEventListener("change", aviso);
}

/* true a partir do desktop (lg). No servidor assume celular. */
export function useTelaLarga() {
  return useSyncExternalStore(
    assinar,
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}
