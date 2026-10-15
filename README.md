# Breno Kauai Tattoo

Site do tatuador Breno Kauai, de Uberlândia (MG). Next.js 16, React 19, Tailwind CSS 4, Motion e Lenis.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Onde mexer no conteúdo

Tudo fica em `src/content/site.ts`: contatos, serviços, passos do orçamento, avaliações, destaques e as galerias.

### Trocar os esboços por fotos e vídeos reais

Os itens da galeria que ainda não têm `src` aparecem como esboço em traço fino. Para colocar a foto ou o vídeo real:

1. Salve o arquivo em `public/trabalhos/` (trabalhos) ou `public/estudio/` (estúdio).
2. No item correspondente em `site.ts`, preencha `src`, por exemplo `src: "/trabalhos/lirio-antebraco.jpg"`.
3. Para vídeo, use `tipo: "video"` e, se quiser uma capa, `poster: "/trabalhos/capa.jpg"`.

Os destaques (Feedbacks, Cicatrizadas, Atendimentos, Mentoria) funcionam como os stories do Instagram. Cada um tem uma lista de `slides`, que podem ser texto, imagem ou vídeo.

## Identidade

- Cores: parede `#e6e6e3` (o cinza da parede do estúdio), tinta `#000`, estêncil `#4b3f9a` (o violeta do decalque, único acento).
- Tipos: Bodoni Moda (títulos, traço fino como o fine line) e Hanken Grotesk (texto).
- A linha violeta que se desenha ao rolar a página é a "agulha" que conecta as seções.
