import React from "react";
import styles from "./ButtonSearch.module.scss";
import MagnifyingGlass from "../../assets/MagnifyingGlass";

interface ButtonSearchProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonSearch = ({ children, onClick }: ButtonSearchProps) => {
  return children ? (
    <button className={styles.buttonSearch} onClick={onClick}>
      <MagnifyingGlass />
      {children}
    </button>
  ) : null;
};

export default ButtonSearch;
