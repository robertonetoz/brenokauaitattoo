"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const assinar = () => () => {};

/* Leva modais para o fim do body, acima de qualquer camada da página. */
export default function Portal({ children }: { children: React.ReactNode }) {
  const noNavegador = useSyncExternalStore(
    assinar,
    () => true,
    () => false,
  );
  return noNavegador ? createPortal(children, document.body) : null;
}
