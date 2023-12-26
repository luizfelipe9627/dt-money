import React from "react";

interface TransactionsContextProps {
  transactions: Transactions;
  setTransactions: React.Dispatch<React.SetStateAction<Transactions>>;
  removeTransaction: (index: number) => void;
  transactionClicked: Transaction;
  setTransactionClicked: React.Dispatch<React.SetStateAction<Transaction>>;
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
  const [transactions, setTransactions] = React.useState<Transactions>(
    [] && JSON.parse(localStorage.getItem("transactions") || "[]"),
  );
  const [transactionClicked, setTransactionClicked] = React.useState(
    {} as Transaction,
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
