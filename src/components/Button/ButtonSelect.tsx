import React from "react";
import styles from "./ButtonSelect.module.scss";
import ArrowDown from "../../assets/ArrowDown";
import ArrowUp from "../../assets/ArrowUp";

interface ButtonSelectProps {
  type: "entry" | "output";
  onClick?: () => void;
  children: React.ReactNode;
}

import { useButtonSelected } from "../../context/ButtonSelectedContext";

const ButtonSelect = ({ type, children }: ButtonSelectProps) => {
  const { buttonSelected, setButtonSelected } = useButtonSelected();
  const buttonEntry = document.querySelector(
    `.${styles.buttonEntry}`,
  ) as HTMLButtonElement;
  const buttonOutput = document.querySelector(
    `.${styles.buttonOutput}`,
  ) as HTMLButtonElement;

  const handleButtonEntry = () => {
    setButtonSelected("entry");
    buttonOutput.classList.remove(`error`);
  };

  const handleButtonOutput = () => {
    setButtonSelected("output");
    buttonEntry.classList.remove(`error`);
  };

  return children ? (
    <>
      {type === "entry" && (
        <button
          className={`${styles.buttonEntry} ${
            buttonSelected === "entry" ? styles.selected : ""
          } text-md`}
          onClick={handleButtonEntry}
        >
          <ArrowUp size="small" />
          {children}
        </button>
      )}
      {type === "output" && (
        <button
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
