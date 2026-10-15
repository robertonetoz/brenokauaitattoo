import { contato, mensagens } from "@/content/site";

export default function Contato() {
  return (
    <footer id="contato" className="on-dark relative overflow-hidden bg-tinta text-parede">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-28 sm:px-8 lg:px-12 lg:pt-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-7">
            <h2 className="font-display text-[clamp(3.2rem,8vw,8rem)] font-normal leading-[0.92] tracking-[-0.035em]">
              Conte sua ideia.
            </h2>
            <p className="mt-8 max-w-[28rem] text-parede/65">
              Orçamentos e dúvidas pelo WhatsApp. Me conte o que você quer eternizar, onde no corpo e um tamanho
              aproximado.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href={contato.whatsapp(mensagens.orcamento)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-parede px-7 py-3.5 text-[0.95rem] text-tinta transition-colors duration-300 hover:bg-estencil hover:text-parede"
              >
                Pedir orçamento no WhatsApp
              </a>
              <a href={contato.telefoneHref} className="link-traco pb-0.5">
                {contato.telefone}
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            <div>
              <h3 className="text-sm text-parede/50">Estúdio</h3>
              <address className="mt-3 not-italic leading-relaxed">
                {contato.endereco}
                <br />
                {contato.bairro}
                <br />
                {contato.cep}
              </address>
              <a href={contato.mapsBusca} target="_blank" rel="noopener noreferrer" className="link-traco mt-3 inline-block pb-0.5 text-sm text-parede/80">
                Abrir no mapa
              </a>
            </div>
            <div>
              <h3 className="text-sm text-parede/50">Horário</h3>
              <p className="mt-3 leading-relaxed">{contato.horario}</p>
            </div>
            <div>
              <h3 className="text-sm text-parede/50">Redes</h3>
              <ul className="mt-3 grid gap-1.5">
                <li>
                  <a href={contato.instagram} target="_blank" rel="noopener noreferrer" className="link-traco pb-0.5">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={contato.tiktok} target="_blank" rel="noopener noreferrer" className="link-traco pb-0.5">
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-parede/50">Para tatuadores</h3>
              <a
                href={contato.whatsapp(mensagens.mentoria)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-traco mt-3 inline-block pb-0.5"
              >
                Mentoria
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-20 aspect-[16/10] w-full overflow-hidden bg-carvao sm:aspect-[21/8]">
          <iframe
            title="Mapa do estúdio Breno Kauai Tattoo"
            src={contato.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 opacity-80 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
          />
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-parede/15 pt-8 text-sm text-parede/50 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-parede">Breno Kauai</p>
          <p>Eu enxergo o que você sente. Uberlândia, MG.</p>
          <p>© 2026 Breno Kauai Tattoo</p>
        </div>
      </div>
    </footer>
  );
}
