// Importa a biblioteca React.
import React from "react";

// Criado um hook chamado useMedia, responsável por verificar o tamanho da tela do dispositivo.
const useMedia = (media: string) => {
  const [match, setMatch] = React.useState(false); // Cria um estado chamado match, e a função setMatch para alterar o estado. O valor inicial do estado é false.

  // O useEffect vai ser executado sempre que o componente for renderizado, e quando o estado media for alterado, ou seja, quando o tamanho da tela for alterado.
  React.useEffect(() => {
    function changeMatch() {
      // Está puxando/desestruturando a proprieadade matches do objeto retornado pelo método window.matchMedia() e armazenando na variável matches contendo o valor true ou false conforme o tamanho da tela.
      const { matches } = window.matchMedia(media);
      setMatch(matches); // Altera o estado match para o valor da variável matches.
    }
    changeMatch(); // chamado a função changeMatch para verificar o tamanho da tela do dispositivo.

    window.addEventListener("resize", changeMatch); // Adiciona um evento de resize na janela do navegador, e quando o evento for disparado, chamado a função changeMatch.

    // Quando o componente for desmontado(remove da tela), remove o evento de resize da janela do navegador, para não ficar executando o evento de resize da janela do navegador quando o componente não estiver mais na tela.
    return () => {
      window.removeEventListener("resize", changeMatch); // Remove o evento de resize da janela do navegador.
    };
  }, [media]);

  return match; // Retorna o estado match.
};

export default useMedia; // Exporta o hook useMedia.
