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

export type Estilo =
  | "Floral"
  | "Fine line"
  | "Mandala"
  | "Pontilhismo"
  | "Geométrico"
  | "Lettering";

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

export const estilos: Estilo[] = [
  "Floral",
  "Fine line",
  "Mandala",
  "Pontilhismo",
  "Geométrico",
  "Lettering",
];

export const trabalhos: Trabalho[] = [
  { id: "t1", tipo: "imagem", estilo: "Floral", motivo: "lirio", proporcao: "3/4", alt: "Lírio em traço fino no antebraço", legenda: "Lírio, antebraço" },
  { id: "t2", tipo: "imagem", estilo: "Fine line", motivo: "ramo", proporcao: "4/5", alt: "Ramo botânico delicado ao longo da coluna", legenda: "Ramo, coluna" },
  { id: "t3", tipo: "video", estilo: "Floral", motivo: "lirio", proporcao: "9/16", alt: "Vídeo de fechamento floral na perna", legenda: "Fechamento floral, perna" },
  { id: "t4", tipo: "imagem", estilo: "Mandala", motivo: "mandala", proporcao: "1/1", alt: "Mandala em pontilhismo no ombro", legenda: "Mandala, ombro" },
  { id: "t5", tipo: "imagem", estilo: "Pontilhismo", motivo: "pontilhismo", proporcao: "4/5", alt: "Sombreado em pontilhismo delicado", legenda: "Pontilhismo, costela" },
  { id: "t6", tipo: "imagem", estilo: "Fine line", motivo: "mariposa", proporcao: "3/4", alt: "Mariposa ornamental nas costas", legenda: "Mariposa, costas" },
  { id: "t7", tipo: "imagem", estilo: "Lettering", motivo: "letras", proporcao: "2/3", alt: "Escrita personalizada em traço fino", legenda: "Lettering, punho" },
  { id: "t8", tipo: "video", src: "/media/orcamento.mp4", estilo: "Fine line", motivo: "ramo", proporcao: "9/16", alt: "Vídeo de uma sessão, do estêncil ao traço", legenda: "Bastidores de uma sessão" },
  { id: "t9", tipo: "imagem", estilo: "Geométrico", motivo: "geometrico", proporcao: "4/5", alt: "Composição geométrica com linhas finas", legenda: "Geométrico, antebraço" },
  { id: "t10", tipo: "imagem", estilo: "Floral", motivo: "lirio", proporcao: "4/5", alt: "Lírio delicado na lateral do abdômen", legenda: "Lírio, abdômen" },
  { id: "t11", tipo: "imagem", estilo: "Mandala", motivo: "mandala", proporcao: "3/4", alt: "Meia mandala no cotovelo", legenda: "Mandala, cotovelo" },
  { id: "t12", tipo: "video", estilo: "Pontilhismo", motivo: "pontilhismo", proporcao: "9/16", alt: "Vídeo de tatuagem em pontilhismo", legenda: "Pontilhismo em vídeo" },
];

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
  capa: { src?: string; motivo: Motivo };
  slides: Slide[];
  acao?: { rotulo: string; href: string };
};

export const destaques: Destaque[] = [
  {
    id: "feedbacks",
    nome: "Feedbacks",
    capa: { motivo: "lirio" },
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
    capa: { motivo: "ramo" },
    slides: [
      {
        tipo: "texto",
        titulo: "Depois da cicatrização",
        texto: "Tatuagem boa é a que continua bonita meses depois. Aqui estão algumas já cicatrizadas.",
      },
      { tipo: "imagem", motivo: "ramo", legenda: "Ramo fino, cicatrizado" },
      { tipo: "imagem", motivo: "lirio", legenda: "Lírio, cicatrizado" },
      { tipo: "imagem", motivo: "pontilhismo", legenda: "Pontilhismo, cicatrizado" },
    ],
  },
  {
    id: "atendimentos",
    nome: "Atendimentos",
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
