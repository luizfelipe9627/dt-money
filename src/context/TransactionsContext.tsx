import React from "react";

interface TransactionsContextProps {
  transactions: {
    description: string;
    price: string;
    category: string;
    type: string | null;
    date: string;
  }[];
  setTransactions: React.Dispatch<
    React.SetStateAction<
      {
        description: string;
        price: string;
        category: string;
        type: string | null;
        date: string;
      }[]
    >
  >;
}

const TransactionsContext =
  React.createContext<TransactionsContextProps | null>(null);

export const useTransactions = () => {
  const context = React.useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions deve estar dentro do TransactionsProvider",
    );
  }

  return context;
};

export const TransactionsProvider = ({ children }: React.PropsWithChildren) => {
  const [transactions, setTransactions] = React.useState<
    {
      description: string;
      price: string;
      category: string;
      type: string | null;
      date: string;
    }[]
  >([] && JSON.parse(localStorage.getItem("transactions") || "[]"));

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};
