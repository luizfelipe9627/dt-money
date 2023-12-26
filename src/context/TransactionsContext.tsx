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
  removeTransaction: (index: number) => void;
  transactionClicked: TransactionsProps;
  setTransactionClicked: React.Dispatch<
    React.SetStateAction<TransactionsProps>
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
  const [transactionClicked, setTransactionClicked] = React.useState(
    {} as TransactionsProps,
  );

  const removeTransaction = (index: number) => {
    const updatedTransactions = [
      ...transactions.slice(0, index),
      ...transactions.slice(index + 1),
    ];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        removeTransaction,
        transactionClicked,
        setTransactionClicked,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
