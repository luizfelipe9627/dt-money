import React from "react";

// Criado uma interface para o contexto chamada ButtonSelectedContextProps.
interface ButtonSelectedContextProps {
  buttonSelected: string | null; // Está definindo que o buttonSelected pode ser uma string ou null.
  setButtonSelected: (buttonSelected: string | null) => void; // Está definindo que o setButtonSelected pode ser uma função que recebe uma string ou null e não retorna nada.
}

const ButtonSelectedContext =
  React.createContext<ButtonSelectedContextProps | null>(null); // Criado um contexto chamado ButtonSelectedContext que recebe a interface ButtonSelectedContextProps ou null. O valor inicial é null.

// Criado um hook chamado useButtonSelected que retorna o contexto ButtonSelectedContext.
export const useButtonSelected = () => {
  const context = React.useContext(ButtonSelectedContext); // Está pegando o contexto ButtonSelectedContext e armazenando na variável context.

  // Se o contexto não existir então executa o if.
  if (!context) {
    // Está lançando um erro.
    throw new Error(
      "useButtonSelected deve estar dentro do ButtonSelectedProvider",
    );
  }

  return context; // Está retornando o contexto.
};

// Criado um componente chamado ButtonSelectedProvider que recebe as propriedades children.
export const ButtonSelectedProvider = ({
  children,
}: React.PropsWithChildren) => {
  // Está criando um estado chamado buttonSelected e a função atualizadora setButtonSelected que pode ser uma string ou null. O valor inicial é null.
  const [buttonSelected, setButtonSelected] = React.useState<string | null>(
    null,
  );

  // Está retornando o contexto ButtonSelectedContext.Provider que recebe o valor do estado buttonSelected e a função atualizadora setButtonSelected.
  return (
    <ButtonSelectedContext.Provider
      // Tudo o que estiver dentro do ButtonSelectedContext.Provider podera ser acessado por todos os componentes que estiverem dentro do ButtonSelectedProvider.
      value={{ buttonSelected, setButtonSelected }}
    >
      {/* Está retornando o componente filho, ou seja, os componentes que estão dentro do ModalProvider. */}
      {children}
    </ButtonSelectedContext.Provider>
  );
};
