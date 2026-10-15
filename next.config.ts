import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    // AVIF primeiro (bem menor no celular), WebP como reserva
    formats: ["image/avif", "image/webp"],
    // as fotos dos trabalhos não mudam; deixa o otimizador guardar por 30 dias
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
