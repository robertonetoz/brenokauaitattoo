/* Evita tocar vídeos sozinho para quem pediu menos movimento ou economia de dados. */
export function semAutoplay() {
  if (typeof window === "undefined") return true;
  const conexao = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conexao?.saveData) || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
