import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brenokauaitattoo.vercel.app"),
  title: "Breno Kauai | Tatuador em Uberlândia",
  description:
    "Eu enxergo o que você sente. E transformo em arte aquilo que te habita. Tatuagens em fine line, floral, mandala e pontilhismo delicado em Uberlândia, MG.",
  openGraph: {
    title: "Breno Kauai | Tatuador em Uberlândia",
    description:
      "Tatuagens em fine line, floral, mandala e pontilhismo delicado. Estúdio em Uberlândia, MG.",
    url: "/",
    siteName: "Breno Kauai Tattoo",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Breno Kauai | Tatuador em Uberlândia",
    description: "Tatuagens em fine line, floral, mandala e pontilhismo delicado. Estúdio em Uberlândia, MG.",
  },
};

export const viewport: Viewport = {
  themeColor: "#e6e6e3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${hanken.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
