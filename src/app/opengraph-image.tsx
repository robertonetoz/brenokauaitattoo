import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
  Prévia do link quando o site é compartilhado (WhatsApp, Instagram, Facebook).
  Mesma identidade do site: parede cinza, tinta preta, um traço de estêncil.
*/

export const alt = "Breno Kauai, tatuador em Uberlândia. Eu enxergo o que você sente.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // caminhos fixos, para a Vercel empacotar só estes arquivos
  const [bodoni, bodoniItalico, hanken, retrato] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/bodoni-moda.woff")),
    readFile(join(process.cwd(), "assets/fonts/bodoni-moda-italic.woff")),
    readFile(join(process.cwd(), "assets/fonts/hanken-grotesk.woff")),
    readFile(join(process.cwd(), "public/media/retrato.jpg")),
  ]);
  const foto = `data:image/jpeg;base64,${retrato.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#e6e6e3", color: "#000" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "Bodoni", fontSize: 34 }}>Breno Kauai</span>
            <span style={{ fontFamily: "Bodoni", fontStyle: "italic", fontSize: 24, color: "#5a5956" }}>tatuador</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Bodoni",
                fontSize: 92,
                lineHeight: 0.95,
                letterSpacing: -3,
              }}
            >
              <span>Eu enxergo</span>
              <span>o que você</span>
              <span>sente.</span>
            </div>
            <span style={{ fontFamily: "Bodoni", fontStyle: "italic", fontSize: 32, marginTop: 28 }}>
              E transformo em arte aquilo que te habita.
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 72, height: 1, background: "#4b3f9a" }} />
            <span style={{ fontFamily: "Hanken", fontSize: 22, color: "#5a5956" }}>
              Fine line, floral e pontilhismo em Uberlândia, MG
            </span>
          </div>
        </div>

        <div style={{ display: "flex", width: 450, height: "100%", borderLeft: "1px solid #4b3f9a" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={foto} alt="" width={450} height={630} style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni", data: bodoni, style: "normal", weight: 400 },
        { name: "Bodoni", data: bodoniItalico, style: "italic", weight: 400 },
        { name: "Hanken", data: hanken, style: "normal", weight: 400 },
      ],
    },
  );
}
