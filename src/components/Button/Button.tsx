import React from "react";
import styles from "./Button.module.scss";

// Criado uma interface chamada ButtonProps.
interface ButtonProps {
  // O operador "?" significa que a propriedade é opcional.
  size: "small" | "medium" | "large"; // Criado um tipo chamado size que só aceita os valores "small", "medium" ou "large".
  onClick?: () => void; // Criado uma função chamada onClick que não recebe nenhum parâmetro e não retorna nada.
  children: React.ReactNode; // O children é um tipo do React que aceita qualquer coisa dentro dele.
}

// Criado um componente chamado Button que recebe as propriedades do tipo ButtonProps, sendo elas size, onClick e children, sendo esse componente responsável por renderizar o botão principal.
const Button = ({ size, onClick, children }: ButtonProps) => {
  // Se o children existir, então renderiza o botão.
  return children ? (
    <>
      {/* Se o size for "small", então renderiza o botão pequeno. */}
      {size === "small" && (
        <button className={styles.buttonSmall} onClick={onClick}>
          {children}
        </button>
      )}
      {/* Se o size for "medium", então renderiza o botão médio. */}
      {size === "medium" && (
        <button className={styles.buttonMedium} onClick={onClick}>
          {children}
        </button>
      )}
      {/* Se o size for "large", então renderiza o botão grande. */}
      {size === "large" && (
        <button className={styles.buttonLarge} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  ) : null;
};

export default Button;
