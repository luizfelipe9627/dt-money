import React from "react";
import styles from "./ButtonSearch.module.scss";
import MagnifyingGlass from "../../assets/MagnifyingGlass";

interface ButtonSearchProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonSearch = ({ children, onClick }: ButtonSearchProps) => {
  return (
    <div className={styles.buttonSearch}>
      <MagnifyingGlass />
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default ButtonSearch;
