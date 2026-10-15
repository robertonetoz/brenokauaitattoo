import type { Motivo } from "@/content/site";

/*
  Desenhos em traço fino, gerados à mão em SVG.
  Servem de esboço enquanto as fotos reais não entram,
  e o lírio é o desenho que abre o site.
*/

export type Desenho = {
  viewBox: string;
  linhas: string[];
  pontos?: [number, number, number][];
  espelho?: number; // largura do viewBox para espelhar as linhas
  texto?: { valor: string; x: number; y: number; tamanho: number };
};

const r = (n: number) => Math.round(n * 10) / 10;

function folha(x: number, y: number, angulo: number, comprimento: number, largura: number) {
  const tx = x + Math.cos(angulo) * comprimento;
  const ty = y + Math.sin(angulo) * comprimento;
  const mx = (x + tx) / 2;
  const my = (y + ty) / 2;
  const px = -Math.sin(angulo) * largura;
  const py = Math.cos(angulo) * largura;
  return [
    `M${r(x)} ${r(y)} Q${r(mx + px)} ${r(my + py)} ${r(tx)} ${r(ty)} Q${r(mx - px)} ${r(my - py)} ${r(x)} ${r(y)}`,
    `M${r(x)} ${r(y)} L${r(x + (tx - x) * 0.82)} ${r(y + (ty - y) * 0.82)}`,
  ];
}

function petala(cx: number, cy: number, r1: number, r2: number, angulo: number, largura: number) {
  const x1 = cx + Math.cos(angulo) * r1;
  const y1 = cy + Math.sin(angulo) * r1;
  const x2 = cx + Math.cos(angulo) * r2;
  const y2 = cy + Math.sin(angulo) * r2;
  const mr = (r1 + r2) / 2;
  const a1 = angulo + largura;
  const a2 = angulo - largura;
  return `M${r(x1)} ${r(y1)} Q${r(cx + Math.cos(a1) * mr)} ${r(cy + Math.sin(a1) * mr)} ${r(x2)} ${r(y2)} Q${r(cx + Math.cos(a2) * mr)} ${r(cy + Math.sin(a2) * mr)} ${r(x1)} ${r(y1)}`;
}

// gerador pseudoaleatório com semente, para o servidor e o navegador desenharem igual
function semente(s: number) {
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const lirio: Desenho = {
  viewBox: "0 0 400 800",
  linhas: [
    // haste
    "M200 800 C205 700 185 620 195 520 S215 380 205 300",
    // folhas
    "M196 560 C150 520 120 470 110 410 C150 440 180 490 196 560",
    "M196 560 C170 520 140 470 122 425",
    "M202 450 C250 420 280 370 295 310 C255 340 220 390 202 450",
    "M202 450 C240 410 268 365 285 325",
    "M198 650 C240 630 265 600 280 560 C245 575 215 610 198 650",
    // botão
    "M200 380 C225 360 245 340 255 322",
    "M255 322 C248 292 260 266 276 250 C282 272 274 300 255 322",
    // pétalas
    "M205 300 C188 250 186 190 205 120 C224 190 222 250 205 300",
    "M205 300 C172 268 122 248 72 202 C122 206 176 236 205 300",
    "M72 202 C61 192 60 182 68 176",
    "M205 300 C238 268 288 246 338 198 C288 206 234 236 205 300",
    "M338 198 C349 188 350 178 342 172",
    "M205 300 C176 252 142 202 126 142 C162 182 192 236 205 300",
    "M205 300 C234 252 268 202 286 142 C250 182 220 236 205 300",
    // nervuras
    "M205 290 C200 240 200 185 205 140",
    "M200 292 C170 262 130 236 92 208",
    "M210 292 C240 262 280 236 318 206",
    // estames
    "M205 296 C194 252 180 222 166 200",
    "M205 296 C216 252 232 222 246 202",
    "M205 296 C204 250 207 220 212 194",
  ],
  pontos: [
    [166, 198, 3.2],
    [246, 200, 3.2],
    [212, 192, 3.2],
    ...(() => {
      const aleatorio = semente(7);
      const lista: [number, number, number][] = [];
      for (let i = 0; i < 70; i++) {
        const a = -Math.PI / 2 + (aleatorio() - 0.5) * 2.2;
        const d = 8 + aleatorio() * 48;
        lista.push([r(205 + Math.cos(a) * d), r(300 + Math.sin(a) * d * 0.9), r(0.6 + aleatorio() * 1.1)]);
      }
      return lista;
    })(),
  ],
};

const ramo: Desenho = (() => {
  const haste = "M150 590 C140 480 165 380 150 280 S140 120 160 20";
  const nos: [number, number][] = [
    [148, 545], [146, 495], [152, 440], [157, 385], [153, 330], [147, 275], [147, 220], [152, 165], [156, 110], [159, 62],
  ];
  const linhas = [haste];
  nos.forEach(([x, y], i) => {
    const esquerda = i % 2 === 0;
    const comprimento = 78 - i * 4.6;
    const angulo = esquerda ? -2.45 + i * 0.03 : -0.7 - i * 0.03;
    linhas.push(...folha(x, y, angulo, comprimento, comprimento * 0.24));
  });
  return { viewBox: "0 0 300 600", linhas };
})();

const mandala: Desenho = (() => {
  const c = 200;
  const linhas: string[] = [
    `M${c + 14} ${c} A14 14 0 1 1 ${c - 14} ${c} A14 14 0 1 1 ${c + 14} ${c}`,
    `M${c + 30} ${c} A30 30 0 1 1 ${c - 30} ${c} A30 30 0 1 1 ${c + 30} ${c}`,
  ];
  for (let i = 0; i < 8; i++) linhas.push(petala(c, c, 30, 78, (i / 8) * Math.PI * 2, 0.32));
  for (let i = 0; i < 16; i++) linhas.push(petala(c, c, 74, 128, (i / 16) * Math.PI * 2 + Math.PI / 16, 0.16));
  for (let i = 0; i < 16; i++) linhas.push(petala(c, c, 92, 116, (i / 16) * Math.PI * 2 + Math.PI / 16, 0.06));
  const recortes: string[] = [];
  for (let i = 0; i < 24; i++) {
    const a1 = (i / 24) * Math.PI * 2;
    const a2 = ((i + 1) / 24) * Math.PI * 2;
    const am = (a1 + a2) / 2;
    recortes.push(
      `M${r(c + Math.cos(a1) * 136)} ${r(c + Math.sin(a1) * 136)} Q${r(c + Math.cos(am) * 158)} ${r(c + Math.sin(am) * 158)} ${r(c + Math.cos(a2) * 136)} ${r(c + Math.sin(a2) * 136)}`,
    );
  }
  linhas.push(recortes.join(" "));
  const pontos: [number, number, number][] = [];
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    pontos.push([r(c + Math.cos(a) * 172), r(c + Math.sin(a) * 172), i % 2 ? 1.2 : 2]);
  }
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2 + Math.PI / 24;
    pontos.push([r(c + Math.cos(a) * 146), r(c + Math.sin(a) * 146), 1.4]);
  }
  return { viewBox: "0 0 400 400", linhas, pontos };
})();

const pontilhismo: Desenho = (() => {
  const aleatorio = semente(21);
  const pontos: [number, number, number][] = [];
  const c = 200;
  for (let i = 0; i < 900; i++) {
    const a = aleatorio() * Math.PI * 2;
    const d = Math.sqrt(aleatorio()) * 140;
    const x = c + Math.cos(a) * d;
    const y = c + Math.sin(a) * d;
    // lua crescente: escurece para a esquerda, some onde a outra lua cobre
    const dentroDaSombra = Math.hypot(x - (c + 62), y - (c - 30)) < 128;
    if (dentroDaSombra) continue;
    const densidade = 1 - (x - (c - 140)) / 280;
    if (aleatorio() > densidade * 1.25) continue;
    pontos.push([r(x), r(y), r(0.6 + densidade * 1.5)]);
  }
  return {
    viewBox: "0 0 400 400",
    linhas: [
      `M${c + 140} ${c} A140 140 0 1 1 ${c - 140} ${c} A140 140 0 1 1 ${c + 140} ${c}`,
      `M${c} 20 L${c} 46`,
      `M${c} 354 L${c} 380`,
    ],
    pontos,
  };
})();

const geometrico: Desenho = (() => {
  const cx = 200;
  const cy = 250;
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [r(cx + Math.cos(a) * 150), r(cy + Math.sin(a) * 150)] as const;
  });
  const tri = [0, 2, 4].map((i) => hex[i]);
  const triInv = [1, 3, 5].map((i) => hex[i]);
  return {
    viewBox: "0 0 400 500",
    linhas: [
      `M${hex.map((p) => p.join(" ")).join(" L")} Z`,
      `M${tri.map((p) => p.join(" ")).join(" L")} Z`,
      `M${triInv.map((p) => p.join(" ")).join(" L")} Z`,
      `M${cx + 75} ${cy} A75 75 0 1 1 ${cx - 75} ${cy} A75 75 0 1 1 ${cx + 75} ${cy}`,
      `M${cx} 20 L${cx} 480`,
    ],
    pontos: [...hex.map(([x, y]) => [x, y, 3] as [number, number, number]), [cx, cy, 4], [cx, 20, 2], [cx, 480, 2]],
  };
})();

const letras: Desenho = {
  viewBox: "0 0 500 300",
  linhas: ["M90 205 C170 228 330 226 420 196", "M420 196 C432 192 440 184 438 176"],
  texto: { valor: "eterno", x: 250, y: 178, tamanho: 112 },
};

const mariposa: Desenho = {
  viewBox: "0 0 400 400",
  espelho: 400,
  linhas: [
    "M206 150 C206 135 194 135 194 150 L194 262 C194 282 206 282 206 262 Z",
    "M203 150 C214 112 236 86 262 72",
    "M208 168 C258 110 336 92 372 122 C366 172 302 204 210 206",
    "M214 178 C262 140 316 128 344 140",
    "M220 192 C268 172 306 166 330 172",
    "M209 214 C280 216 332 252 312 302 C274 324 232 284 206 244",
    "M214 226 C258 236 290 258 296 288",
  ],
  pontos: [
    [262, 72, 2.4],
    [300, 150, 7],
    [284, 266, 4],
    [356, 128, 1.4],
    [362, 140, 1.4],
    [350, 154, 1.4],
  ],
};

const maquina: Desenho = {
  viewBox: "0 0 300 500",
  linhas: [
    "M128 110 L172 110 L172 330 L128 330 Z",
    "M128 150 L172 150",
    "M124 210 L176 210 L176 330 L124 330 Z",
    "M124 228 L176 228 M124 246 L176 246 M124 264 L176 264 M124 282 L176 282 M124 300 L176 300",
    "M134 330 L144 400 L156 400 L166 330",
    "M150 400 L150 436",
    "M150 110 C150 60 196 34 252 28",
    "M140 128 L160 128 M140 136 L160 136",
  ],
  pontos: [[150, 440, 2]],
};

const maca: Desenho = {
  viewBox: "0 0 500 350",
  linhas: [
    "M70 170 L420 170 C430 170 436 176 436 186 L436 196 L70 196 C60 196 54 190 54 183 C54 176 60 170 70 170 Z",
    "M330 170 L360 128 L440 118 C452 117 458 124 452 134 L436 170",
    "M120 196 L120 300 M380 196 L380 300",
    "M96 300 L144 300 M356 300 L404 300",
    "M120 250 L380 250",
  ],
};

const tintas: Desenho = {
  viewBox: "0 0 400 300",
  linhas: [
    "M80 140 L140 140 L140 260 L80 260 Z",
    "M96 110 L124 110 L124 140 L96 140 Z",
    "M104 80 L116 80 L116 110 L104 110 Z",
    "M170 120 L240 120 L240 260 L170 260 Z",
    "M188 90 L222 90 L222 120 L188 120 Z",
    "M198 60 L212 60 L212 90 L198 90 Z",
    "M270 160 L320 160 L320 260 L270 260 Z",
    "M282 136 L308 136 L308 160 L282 160 Z",
    "M40 260 L360 260",
    "M88 180 L132 180 M178 170 L232 170 M278 200 L312 200",
  ],
};

export const desenhos: Record<Motivo, Desenho> = {
  lirio,
  ramo,
  mandala,
  pontilhismo,
  geometrico,
  letras,
  mariposa,
  maquina,
  maca,
  tintas,
};
