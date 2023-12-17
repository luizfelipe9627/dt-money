import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  size: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ size, onClick, children }: ButtonProps) => {
  return children ? (
    <>
      {size === "small" && (
        <button className={styles.buttonSmall} onClick={onClick}>
          {children}
        </button>
      )}
      {size === "medium" && (
        <button className={styles.buttonMedium} onClick={onClick}>
          {children}
        </button>
      )}
      {size === "large" && (
        <button className={styles.buttonLarge} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  ) : null;
};

export default Button;
