import React from "react";
import styles from "./ButtonSearch.module.scss";
import MagnifyingGlass from "../../assets/MagnifyingGlass";

// Criado uma interface chamada ButtonSearchProps.
interface ButtonSearchProps {
  // O operador "?" significa que a propriedade é opcional.
  onClick?: () => void; // Criado uma função chamada onClick que não recebe nenhum parâmetro e não retorna nada.
  children: React.ReactNode; // O children é um tipo do React que aceita qualquer coisa dentro dele.
}

// Criado um componente chamado ButtonSearch que recebe as propriedades do tipo ButtonSearchProps, sendo elas onClick e children, sendo esse componente responsável por renderizar o botão de pesquisa.
const ButtonSearch = ({ children, onClick }: ButtonSearchProps) => {
  return (
    <div className={styles.buttonSearch} onClick={onClick}>
      <MagnifyingGlass />
      <button>{children}</button>
    </div>
  );
};

export default ButtonSearch;
