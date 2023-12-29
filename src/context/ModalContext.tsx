import React from "react";

// Criado uma interface para o contexto chamada ModalContextProps.
interface ModalContextProps {
  modalTransaction: boolean; // Está definindo que o modalTransaction pode ser uma boolean.
  setModalTransaction: React.Dispatch<React.SetStateAction<boolean>>; // Está definindo que o setModalTransaction pode ser uma função useState que recebe uma boolean e não retorna nada.
  modalOptions: boolean; // Está definindo que o modalOptions pode ser uma boolean.
  setModalOptions: React.Dispatch<React.SetStateAction<boolean>>; // Está definindo que o setModalOptions pode ser uma função useState que recebe uma boolean e não retorna nada.
  modalEdit: boolean; // Está definindo que o modalEdit pode ser uma boolean.
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>; // Está definindo que o setModalEdit pode ser uma função useState que recebe uma boolean e não retorna nada.
}

const ModalContext = React.createContext<ModalContextProps | null>(null); // Criado um contexto chamado ModalContext que recebe a interface ModalContextProps ou null. O valor inicial é null.

// Criado um hook chamado useModal que retorna o contexto ModalContext.
export const useModal = () => {
  const context = React.useContext(ModalContext); // Está pegando o contexto ModalContext e armazenando na variável context.

  // Se o contexto não existir então executa o if.
  if (!context) {
    // Está lançando um erro.
    throw new Error("useModal deve estar dentro do ModalProvider");
  }

  return context; // Está retornando o contexto.
};

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [modalTransaction, setModalTransaction] = React.useState(false); // Está criando um estado chamado modalTransaction e a função atualizadora setModalTransaction. O valor inicial é false.
  const [modalOptions, setModalOptions] = React.useState(false); // Está criando um estado chamado modalOptions e a função atualizadora setModalOptions. O valor inicial é false.
  const [modalEdit, setModalEdit] = React.useState(false); // Está criando um estado chamado modalEdit e a função atualizadora setModalEdit. O valor inicial é false.

  // Está retornando o contexto ModalContext.Provider que recebe o valor dos estados modalTransaction, modalOptions, modalEdit e as funções atualizadoras setModalTransaction, setModalOptions, setModalEdit.
  return (
    <ModalContext.Provider
      // Tudo o que estiver dentro do ModalContext.Provider podera ser acessado por todos os componentes que estiverem dentro do ModalProvider.
      value={{
        modalTransaction,
        setModalTransaction,
        modalOptions,
        setModalOptions,
        modalEdit,
        setModalEdit,
      }}
    >
      {/* Está retornando o componente filho, ou seja, os componentes que estão dentro do ModalProvider. */}
      {children}
    </ModalContext.Provider>
  );
};
