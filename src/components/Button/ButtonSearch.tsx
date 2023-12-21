import React from "react";
import styles from "./ButtonSearch.module.scss";
import MagnifyingGlass from "../../assets/MagnifyingGlass.svg";

interface ButtonSearchProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonSearch = ({ children, onClick }: ButtonSearchProps) => {
  return (
    <button className={styles.buttonSearch} onClick={onClick}>
      <img
        src={MagnifyingGlass}
        alt="Lupa de pesquisa"
      />
      {children}
    </button>
  );
};

export default ButtonSearch;
