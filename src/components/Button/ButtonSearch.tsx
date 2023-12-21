import React from "react";
import styles from "./ButtonSearch.module.scss";
import MagnifyingGlass from "../../assets/MagnifyingGlass.svg";

interface ButtonSearchProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonSearch = ({ children, onClick }: ButtonSearchProps) => {
  return (
    <div className={styles.buttonSearch}>
      <img src={MagnifyingGlass} alt="Magnifying Glass" />
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default ButtonSearch;
