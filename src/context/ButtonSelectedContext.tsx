import React from "react";

interface ButtonSelectedContextProps {
  buttonSelected: string | null;
  setButtonSelected: (buttonSelected: string | null) => void;
}

const ButtonSelectedContext =
  React.createContext<ButtonSelectedContextProps | null>(null);

export const useButtonSelected = () => {
  const context = React.useContext(ButtonSelectedContext);

  if (!context) {
    throw new Error(
      "useButtonSelected deve estar dentro do ButtonSelectedProvider",
    );
  }

  return context;
};

export const ButtonSelectedProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [buttonSelected, setButtonSelected] = React.useState<string | null>(
    null,
  );

  return (
    <ButtonSelectedContext.Provider
      value={{ buttonSelected, setButtonSelected }}
    >
      {children}
    </ButtonSelectedContext.Provider>
  );
};
