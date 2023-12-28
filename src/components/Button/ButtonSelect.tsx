import React from "react";
import styles from "./ButtonSelect.module.scss";
import ArrowDown from "../../assets/ArrowDown";
import ArrowUp from "../../assets/ArrowUp";
import { useButtonSelected } from "../../context/ButtonSelectedContext";

// Criado uma interface chamada ButtonSelectProps.
interface ButtonSelectProps {
  type: "entry" | "output"; // Criado um tipo chamado type que só aceita os valores "entry" ou "output".
  children: React.ReactNode; // O children é um tipo do React que aceita qualquer coisa dentro dele.
}

// Criado um componente chamado ButtonSelect que recebe as propriedades da interface ButtonSelectProps, sendo elas type e children, sendo esse componente responsável por renderizar o botão de entrada e saída.
const ButtonSelect = ({ type, children }: ButtonSelectProps) => {
  const { buttonSelected, setButtonSelected } = useButtonSelected(); // Está pegando o buttonSelected e o setButtonSelected do custom hook useButtonSelected.

  // Está pegando os elementos do DOM que tem a classe buttonEntry e buttonOutput e atribuindo a uma variável.
  const buttonEntry = document.querySelector(
    `.${styles.buttonEntry}`,
  ) as HTMLButtonElement;
  const buttonOutput = document.querySelector(
    `.${styles.buttonOutput}`,
  ) as HTMLButtonElement;

  // Está criando uma função chamada handleButtonEntry.
  const handleButtonEntry = () => {
    setButtonSelected("entry"); // Está setando o buttonSelected para "entry".
    buttonOutput.classList.remove("error"); // Está removendo a classe error do buttonOutput.
  };

  // Está criando uma função chamada handleButtonOutput.
  const handleButtonOutput = () => {
    setButtonSelected("output"); // Está setando o buttonSelected para "output".
    buttonEntry.classList.remove("error"); // Está removendo a classe error do buttonEntry.
  };

  // Se o children for verdadeiro, então retorna o botão.
  return children ? (
    <>
      {/* Se o type for "entry", então retorna o botão de entrada. */}
      {type === "entry" && (
        <button
          // Se o buttonSelected for igual a "entry", então adiciona a classe selected, caso contrário, não adiciona.
          className={`${styles.buttonEntry} ${
            buttonSelected === "entry" ? styles.selected : ""
          } text-md`}
          onClick={handleButtonEntry}
        >
          <ArrowUp size="small" />
          {children}
        </button>
      )}

      {/* Se o type for "output", então retorna o botão de saída. */}
      {type === "output" && (
        <button
          // Se o buttonSelected for igual a "output", então adiciona a classe selected, caso contrário, não adiciona.
          className={`${styles.buttonOutput} ${
            buttonSelected === "output" ? styles.selected : ""
          }  text-md`}
          onClick={handleButtonOutput}
        >
          <ArrowDown size="small" />
          {children}
        </button>
      )}
    </>
  ) : null;
};

export default ButtonSelect;
