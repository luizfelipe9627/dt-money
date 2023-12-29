import React from "react";

// Criado uma interface para o contexto chamada TransactionsContextProps.
interface TransactionsContextProps {
  transactions: Transactions; // Está definindo que o transactions é do tipo Transactions que é um array de objetos.
  setTransactions: React.Dispatch<React.SetStateAction<Transactions>>; // Está definindo que o setTransactions é uma função useState que recebe Transactions e não retorna nada.
  removeTransaction: (index: number) => void; // Está definindo que o removeTransaction é uma função que recebe um número e não retorna nada.
  transactionClicked: Transaction; // Está definindo que o transactionClicked é do tipo Transaction que é um objeto.
  setTransactionClicked: React.Dispatch<React.SetStateAction<Transaction>>; // Está definindo que o setTransactionClicked é uma função useState que recebe Transaction e não retorna nada.
}

const TransactionsContext =
  React.createContext<TransactionsContextProps | null>(null); // Criado um contexto chamado TransactionsContext que recebe a interface TransactionsContextProps ou null. O valor inicial é null.

// Criado um hook chamado useTransactions que retorna o contexto TransactionsContext.
export const useTransactions = () => {
  const context = React.useContext(TransactionsContext); // Está pegando o contexto TransactionsContext e armazenando na variável context.

  // Se o contexto não existir então executa o if.
  if (!context) {
    // Está lançando um erro.
    throw new Error(
      "useTransactions deve estar dentro do TransactionsProvider",
    );
  }

  return context; // Está retornando o contexto.
};

// Criado um componente chamado TransactionsProvider que recebe as propriedades children.
export const TransactionsProvider = ({ children }: React.PropsWithChildren) => {
  // Está criando um estado chamado transactions e a função atualizadora setTransactions que é do tipo Transactions que é um array de objetos. O valor inicial é um array vazio e se não existir nada no localStorage então o valor inicial é um array vazio.
  const [transactions, setTransactions] = React.useState<Transactions>(
    [] && JSON.parse(localStorage.getItem("transactions") || "[]"),
  );
  // Está criando um estado chamado transactionClicked e a função atualizadora setTransactionClicked que é do tipo Transaction que é um objeto. O valor inicial é um objeto vazio do tipo Transaction.
  const [transactionClicked, setTransactionClicked] = React.useState(
    {} as Transaction,
  );

  // Criado uma função chamada removeTransaction que recebe um index do tipo number, sendo essa função responsável por remover uma transação do array transactions.
  const removeTransaction = (index: number) => {
    //
    const updatedTransactions = [
      // O slice está passando por todas as transações e recebendo dois parâmetros, o primeiro é o index 0 e o segundo é o index que foi passado como parâmetro. Ou seja, está pegando todas as transações até o index que foi passado como parâmetro.
      ...transactions.slice(0, index),
      // O slice está passando por todas as transações e recebendo dois parâmetros, o primeiro é o index + 1 e o segundo é o tamanho do array transactions. Ou seja, está pegando todas as transações a partir do index + 1 que foi passado como parâmetro.
      ...transactions.slice(index + 1),
    ];
    setTransactions(updatedTransactions); // Está atualizando o estado transactions com o array updatedTransactions.
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions)); // Está atualizando o localStorage com o array updatedTransactions.
  };

  // Criado uma função chamada addTransaction que recebe um transaction do tipo Transaction, sendo essa função responsável por adicionar uma transação no array transactions.
  return (
    <TransactionsContext.Provider
      // Tudo o que estiver dentro do TransactionsContext.Provider podera ser acessado por todos os componentes que estiverem dentro do TransactionsProvider.
      value={{
        transactions,
        setTransactions,
        removeTransaction,
        transactionClicked,
        setTransactionClicked,
      }}
    >
      {/* Está retornando o componente filho, ou seja, os componentes que estão dentro do TransactionsProvider. */}
      {children}
    </TransactionsContext.Provider>
  );
};
