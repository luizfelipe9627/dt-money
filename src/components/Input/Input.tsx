import React from "react";
import styles from "./Input.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  success?: boolean;
  error?: boolean;
};

const Input = ({
  children,
  onChange,
  success,
  error,
  ...props
}: InputProps) => {
  return (
    <input
      className={`${styles.input} ${success ? "success" : ""} ${
        error ? "error" : ""
      }`}
      onChange={onChange}
      {...props}
    >
      {children}
    </input>
  );
};

export default Input;
