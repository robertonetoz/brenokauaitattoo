import Abertura from "@/components/Abertura";
import Avaliacoes from "@/components/Avaliacoes";
import Contato from "@/components/Contato";
import Destaques from "@/components/Destaques";
import Estilos from "@/components/Estilos";
import Estudio from "@/components/Estudio";
import LinhaAgulha from "@/components/LinhaAgulha";
import Navegacao from "@/components/Navegacao";
import Orcamento from "@/components/Orcamento";
import RolagemSuave from "@/components/RolagemSuave";
import Sobre from "@/components/Sobre";
import Trabalhos from "@/components/Trabalhos";

export default function Home() {
  return (
    <>
      <RolagemSuave />
      <Navegacao />
      <main>
        <Abertura />
        <LinhaAgulha>
          <Sobre />
          <Trabalhos />
          <Estilos />
          <Destaques />
          <Orcamento />
          <Estudio />
          <Avaliacoes />
        </LinhaAgulha>
      </main>
      <Contato />
    </>
  );
}
