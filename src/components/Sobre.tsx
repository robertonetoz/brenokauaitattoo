import Image from "next/image";
import Revelar from "./Revelar";

export default function Sobre() {
  return (
    <section id="sobre" className="mx-auto max-w-[1440px] px-4 py-28 sm:px-8 lg:px-12 lg:py-40">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <Revelar className="relative aspect-square w-full overflow-hidden bg-parede-2 lg:col-span-5">
          <Image
            src="/media/trabalhando.jpg"
            alt="Breno tatuando a perna de uma cliente no estúdio"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </Revelar>

        <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
          <h2 className="font-display text-[clamp(2.4rem,4.6vw,4.4rem)] font-normal leading-[1] tracking-[-0.025em]">
            Cada tatuagem começa numa conversa.
          </h2>
          <div className="mt-10 grid max-w-[36rem] gap-5 text-[1.0625rem] text-carvao">
            <p>
              Tatuagem é uma coisa muito pessoal. Por isso, antes de qualquer traço, eu escuto: o que você quer
              lembrar, o que você sente, onde isso mora em você.
            </p>
            <p>
              Meu trabalho é delicado por escolha. Linhas finas, flores, pontilhismo e ornamentos que acompanham o
              corpo e continuam bonitos depois de cicatrizados.
            </p>
            <p>
              No estúdio, cada etapa é pensada pra que a sua experiência seja única, do primeiro contato ao cuidado
              depois da sessão.
            </p>
          </div>

          <dl className="mt-14 grid max-w-[36rem] grid-cols-3 gap-6 border-t border-tinta/15 pt-6">
            <div>
              <dt className="text-sm text-grafite">Google</dt>
              <dd className="mt-1 font-display text-2xl">5,0</dd>
            </div>
            <div>
              <dt className="text-sm text-grafite">Avaliações</dt>
              <dd className="mt-1 font-display text-2xl">70</dd>
            </div>
            <div>
              <dt className="text-sm text-grafite">No Instagram</dt>
              <dd className="mt-1 font-display text-2xl">17,5 mil</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
