import React from "react";
import styles from "./Input.module.scss";

// Criado uma interface chamada InputProps que recebe as propriedades do tipo Input do HTML. O & significa que ele pode receber mais propriedades além das do input.
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // O operador "?" significa que a propriedade é opcional.
  children?: React.ReactNode; // children é do tipo React.ReactNode, ou seja, pode receber qualquer coisa.
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // Definiu que o onChange é do tipo React.ChangeEventHandler<HTMLInputElement>.
  success?: boolean;
  error?: boolean;
};

// Criado um componente chamado Input que recebe as propriedades do tipo InputProps, sendo elas children, onChange, success e error. O ...props significa que ele pode receber qualquer propriedade de um input.
const Input = ({
  children,
  onChange,
  success,
  error,
  ...props
}: InputProps) => {
  return (
    // Se o success for verdadeiro, então adiciona a classe success, caso contrário, não adiciona. Se o error for verdadeiro, então adiciona a classe error, caso contrário, não adiciona.
    <input
      className={`${styles.input} ${success ? "success" : ""} ${
        error ? "error" : ""
      }`}
      // Está passando o onChange passado como propriedade para o onChange do input.
      onChange={onChange}
      // Está passando todas as propriedades que não foram desestruturadas como propriedades do input.
      {...props}
    >
      {children}
    </input>
  );
};

export default Input;
