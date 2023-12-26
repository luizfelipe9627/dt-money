import React from "react";

interface ModalContextProps {
  modalTransaction: boolean;
  setModalTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  modalOptions: boolean;
  setModalOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = React.createContext<ModalContextProps | null>(null);

export const useModal = () => {
  const context = React.useContext(ModalContext);

  if (!context) {
    throw new Error("useModal deve estar dentro do ModalProvider");
  }

  return context;
};

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [modalTransaction, setModalTransaction] = React.useState(false);
  const [modalOptions, setModalOptions] = React.useState(false);

  return (
    <ModalContext.Provider
      value={{
        modalTransaction,
        setModalTransaction,
        modalOptions,
        setModalOptions,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
