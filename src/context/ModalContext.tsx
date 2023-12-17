import React from "react";

interface ModalContextProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [modal, setModal] = React.useState(false);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
