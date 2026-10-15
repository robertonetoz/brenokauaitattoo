/*
  Todo o conteúdo do site mora aqui.
  Para trocar um esboço por uma foto ou vídeo real, coloque o arquivo em
  /public/trabalhos (ou /public/estudio) e preencha `src` no item.
  Itens sem `src` aparecem como esboço em traço fino.
*/

export type Motivo =
  | "lirio"
  | "ramo"
  | "mandala"
  | "pontilhismo"
  | "geometrico"
  | "letras"
  | "mariposa"
  | "maquina"
  | "maca"
  | "tintas";

export type Estilo = "Floral" | "Fine line" | "Mandala" | "Pontilhismo" | "Realismo";

export type Midia = {
  id: string;
  tipo: "imagem" | "video";
  src?: string;
  poster?: string;
  motivo: Motivo;
  alt: string;
  legenda: string;
  proporcao: "4/5" | "3/4" | "1/1" | "9/16" | "2/3";
};

export type Trabalho = Midia & { estilo: Estilo };

const whatsappNumero = "5534991343283";

export const contato = {
  nome: "Breno Kauai",
  instagram: "https://www.instagram.com/brenokauaitattoo",
  instagramArroba: "@brenokauaitattoo",
  tiktok: "https://www.tiktok.com/@brenokauaitattoo",
  telefone: "(34) 99134-3283",
  telefoneHref: "tel:+5534991343283",
  whatsapp: (texto: string) =>
    `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(texto)}`,
  endereco: "Av. Cesário Alvim, 3550, sala 204",
  bairro: "Brasil, Uberlândia, MG",
  cep: "38400-696",
  horario: "Atendimento com hora marcada, até as 19h",
  mapsBusca:
    "https://www.google.com/maps/search/?api=1&query=Breno+kauai+tattoo+Av.+Ces%C3%A1rio+Alvim+3550+Uberl%C3%A2ndia",
  mapsEmbed:
    "https://www.google.com/maps?q=Av.+Ces%C3%A1rio+Alvim,+3550+-+Brasil,+Uberl%C3%A2ndia+-+MG,+38400-696&z=16&output=embed",
  avaliacoesGoogle:
    "https://www.google.com/search?q=Breno+kauai+tattoo+Uberl%C3%A2ndia#lrd",
};

export const mensagens = {
  orcamento: "Olá, Breno! Vim pelo site e quero fazer um orçamento de tatuagem.",
  mentoria: "Olá, Breno! Vim pelo site e quero saber mais sobre a mentoria.",
};

// A ordem aqui é a ordem da galeria. Os filtros aparecem conforme os estilos usados.
export const trabalhos: Trabalho[] = [
  { id: "mariposa", tipo: "imagem", src: "/trabalhos/mariposa-costas.jpg", estilo: "Fine line", motivo: "mariposa", proporcao: "1/1", alt: "Mariposa ornamental com fases da lua e folhas, ocupando as costas inteiras", legenda: "Mariposa e fases da lua, costas" },
  { id: "onca", tipo: "imagem", src: "/trabalhos/onca-floral-panturrilha.jpg", estilo: "Realismo", motivo: "lirio", proporcao: "1/1", alt: "Onça olhando para uma borboleta, cercada de flores, na panturrilha", legenda: "Onça e flores, panturrilha" },
  { id: "video-perna", tipo: "video", src: "/trabalhos/video-a.mp4", estilo: "Floral", motivo: "lirio", proporcao: "9/16", alt: "Vídeo de uma tatuagem floral na perna, do estêncil ao resultado", legenda: "Do estêncil à pele, perna" },
  { id: "lirio", tipo: "imagem", src: "/trabalhos/lirio-braco.jpg", estilo: "Floral", motivo: "lirio", proporcao: "1/1", alt: "Lírio em traço fino com haste em laço no braço", legenda: "Lírio, braço" },
  { id: "mandala", tipo: "imagem", src: "/trabalhos/mandala-floral-quadril.jpg", estilo: "Mandala", motivo: "mandala", proporcao: "4/5", alt: "Mandala com peônias e folhas na lateral do quadril", legenda: "Mandala e peônias, quadril" },
  { id: "fenix", tipo: "imagem", src: "/trabalhos/fenix-braco.jpg", estilo: "Pontilhismo", motivo: "pontilhismo", proporcao: "4/5", alt: "Fênix em pontilhismo com lua e estrelas no braço", legenda: "Fênix, braço" },
  { id: "pets", tipo: "imagem", src: "/trabalhos/retrato-pets-tornozelo.jpg", estilo: "Realismo", motivo: "letras", proporcao: "1/1", alt: "Retrato de dois cachorros com os nomes Mel e Devassa no tornozelo, ao lado dos próprios cães", legenda: "Retrato pet com nomes, tornozelo" },
  { id: "video-braco", tipo: "video", src: "/trabalhos/video-b.mp4", estilo: "Fine line", motivo: "ramo", proporcao: "9/16", alt: "Vídeo de uma tatuagem em traço fino no braço", legenda: "Traço fino, braço" },
  { id: "iris", tipo: "imagem", src: "/trabalhos/iris-braco.jpg", estilo: "Floral", motivo: "lirio", proporcao: "1/1", alt: "Íris e botões de flor contornando o braço", legenda: "Íris, braço" },
  { id: "polvo", tipo: "imagem", src: "/trabalhos/polvo-ombro.jpg", estilo: "Realismo", motivo: "pontilhismo", proporcao: "4/5", alt: "Polvo realista com tentáculos enrolados no ombro", legenda: "Polvo, ombro" },
];

export const reel = {
  src: "/media/meus-trabalhos.mp4",
  alt: "Vídeo do Breno tatuando no estúdio, com alguns dos trabalhos dele",
  legenda: "Um pouco do meu dia no estúdio",
};

export const servicos = {
  estilos: [
    { nome: "Fine line", texto: "Traço fino, leve e preciso, que envelhece bem na pele.", motivo: "ramo" as Motivo },
    { nome: "Floral e botânica", texto: "Lírios, ramos e flores desenhados para o seu corpo.", motivo: "lirio" as Motivo },
    { nome: "Tatuagens femininas", texto: "Composições delicadas que acompanham as curvas.", motivo: "mariposa" as Motivo },
    { nome: "Mandala", texto: "Simetria e ornamento, do detalhe ao fechamento.", motivo: "mandala" as Motivo },
    { nome: "Pontilhismo delicado", texto: "Sombra construída ponto a ponto, sem pesar.", motivo: "pontilhismo" as Motivo },
    { nome: "Geométrica", texto: "Linhas e formas exatas, equilíbrio no traço.", motivo: "geometrico" as Motivo },
    { nome: "Letras personalizadas", texto: "Nomes, datas e frases com escrita desenhada à mão.", motivo: "letras" as Motivo },
  ],
  estudio: [
    { nome: "Design de tatuagem", texto: "Cada desenho é criado a partir da sua história." },
    { nome: "Acabamento", texto: "Revisão e acabamento para a tatuagem ficar como foi pensada." },
    { nome: "Agendamento on-line", texto: "Orçamento e agenda direto pelo WhatsApp." },
  ],
};

export const passos = [
  {
    titulo: "Conte sua ideia",
    texto:
      "Mande pelo WhatsApp o que você quer eternizar, referências, o local do corpo e um tamanho aproximado.",
  },
  {
    titulo: "A conversa",
    texto:
      "Eu escuto cada detalhe e entendo o sentido que essa tatuagem tem pra você. Aqui sai o seu orçamento.",
  },
  {
    titulo: "O desenho",
    texto:
      "Crio uma arte autoral, pensada para o seu corpo, e ajustamos juntos até ficar do seu jeito.",
  },
  {
    titulo: "A sessão",
    texto:
      "No dia, você chega num espaço tranquilo e confortável. Depois, recebe as orientações de cuidado e cicatrização.",
  },
];

export const avaliacoes = [
  {
    nome: "Cyntia Andrade",
    quando: "há um mês",
    texto:
      "Tatuagem é uma coisa muito pessoal e o atendimento faz toda diferença. O Breno, além de ser um profissional incrível, tem um atendimento personalizado e escuta cada detalhe que você quer.",
  },
  {
    nome: "Amanda Umbelino",
    quando: "há um ano",
    texto:
      "A melhor experiência com tatuagem que já tive na vida foi com o Breno! Fiz uma tatuagem botânica no braço que ficou linda, delicada e praticamente não senti dor ao tatuar.",
  },
  {
    nome: "Giovana Medaglia",
    quando: "há 5 meses",
    texto:
      "O Breno é simplesmente impecável! O resultado ficou perfeito, exatamente do jeitinho que eu queria. O traço dele é incrível! Recomendo de olhos fechados!",
  },
  {
    nome: "Arlinda Flores Coleto",
    quando: "há 5 meses",
    texto:
      "O Breno consegue traduzir nossos sentimentos em arte! Ele é muito educado e o estúdio dele é lindo e confortável!",
  },
  {
    nome: "Simone Nogueira",
    quando: "há 8 meses",
    texto:
      "Foi uma arte de 6 horas de trabalho e muito tempo ele sempre com seus cuidados e atenção. Gratidão imensa e com certeza a próxima será ele que irá fazer.",
  },
  {
    nome: "Gabriela Fonseca",
    quando: "há 8 meses",
    texto:
      "Excelente profissional, nos deixa super à vontade e segura. Tem um traço maravilhoso e é super atento aos detalhes! Sem falar do espaço, que é super aconchegante.",
  },
  {
    nome: "Nickole Augusta",
    quando: "há 8 meses",
    texto:
      "Ótimo atendimento, muito atencioso e cuidadoso com os detalhes, super paciente. Amo seu traço e também adorei o mimo que me deu pós sessão.",
  },
  {
    nome: "Jessica Marques Leão",
    quando: "há 5 meses",
    texto:
      "Super profissional, atencioso, me senti super confortável, ambiente impecável. Experiência maravilhosa, super indico, apaixonada nas minhas tattoos.",
  },
];

export type Slide =
  | { tipo: "texto"; titulo?: string; texto: string; assinatura?: string }
  | { tipo: "imagem"; src?: string; motivo: Motivo; legenda?: string }
  | { tipo: "video"; src: string; legenda?: string };

export type Destaque = {
  id: string;
  nome: string;
  /** o destaque completo no Instagram */
  instagram: string;
  capa: { src?: string; motivo: Motivo };
  /** sem slides, o destaque abre direto no Instagram */
  slides: Slide[];
  acao?: { rotulo: string; href: string };
};

export const destaques: Destaque[] = [
  {
    id: "feedbacks",
    nome: "Feedbacks",
    instagram: "https://www.instagram.com/stories/highlights/17925562520307846/",
    capa: { src: "/trabalhos/lirio-braco.jpg", motivo: "lirio" },
    slides: avaliacoes.slice(0, 5).map((a) => ({
      tipo: "texto" as const,
      texto: a.texto,
      assinatura: a.nome,
    })),
    acao: { rotulo: "Ver avaliações no Google", href: contato.avaliacoesGoogle },
  },
  {
    id: "cicatrizadas",
    nome: "Cicatrizadas",
    instagram: "https://www.instagram.com/stories/highlights/17922338311572344/",
    capa: { src: "/trabalhos/fenix-braco.jpg", motivo: "ramo" },
    slides: [],
  },
  {
    id: "atendimentos",
    nome: "Atendimentos",
    instagram: "https://www.instagram.com/stories/highlights/18350427904186510/",
    capa: { src: "/media/trabalhando.jpg", motivo: "maquina" },
    slides: [
      {
        tipo: "texto",
        titulo: "Como é ser atendido aqui",
        texto: "Cada etapa é pensada pra garantir a sua experiência de forma 100% única.",
      },
      { tipo: "imagem", src: "/media/trabalhando.jpg", motivo: "maquina", legenda: "Sessão no estúdio" },
      { tipo: "video", src: "/media/orcamento.mp4", legenda: "Como fazer seu orçamento" },
      {
        tipo: "texto",
        texto: "Conte comigo pra eternizar sua ideia 🤍",
      },
    ],
    acao: { rotulo: "Pedir orçamento", href: contato.whatsapp(mensagens.orcamento) },
  },
  {
    id: "mentoria",
    nome: "Mentoria",
    instagram: "https://www.instagram.com/stories/highlights/18090014107444797/",
    capa: { motivo: "maquina" },
    slides: [
      {
        tipo: "texto",
        titulo: "Mentoria para tatuadores",
        texto: "Pra quem tatua e quer evoluir no traço fino, na composição e no atendimento.",
      },
      {
        tipo: "texto",
        texto: "Eu compartilho o que aprendi no dia a dia do estúdio, do desenho à experiência do cliente.",
      },
      {
        tipo: "texto",
        texto: "Quer saber formato, datas e valores? Me chama no WhatsApp.",
      },
    ],
    acao: { rotulo: "Saber sobre a mentoria", href: contato.whatsapp(mensagens.mentoria) },
  },
];

export const estudio: Midia[] = [
  { id: "e1", tipo: "imagem", src: "/media/trabalhando.jpg", motivo: "maquina", proporcao: "1/1", alt: "Breno tatuando uma cliente no estúdio", legenda: "Durante a sessão" },
  { id: "e2", tipo: "imagem", motivo: "maca", proporcao: "3/4", alt: "Sala de atendimento do estúdio", legenda: "Sala de atendimento" },
  { id: "e3", tipo: "imagem", motivo: "tintas", proporcao: "4/5", alt: "Materiais e tintas organizados na bancada", legenda: "Materiais" },
  { id: "e4", tipo: "imagem", src: "/media/retrato.jpg", motivo: "maquina", proporcao: "4/5", alt: "Retrato de Breno Kauai", legenda: "Breno Kauai" },
  { id: "e5", tipo: "imagem", motivo: "maquina", proporcao: "3/4", alt: "Máquina de tatuagem preparada para a sessão", legenda: "A máquina" },
  { id: "e6", tipo: "imagem", motivo: "lirio", proporcao: "1/1", alt: "Desenhos em estêncil na bancada", legenda: "Desenhos em estêncil" },
];
