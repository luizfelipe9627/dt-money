import React from "react";
import { useTransactions } from "../../context/TransactionsContext";
import Pagination from "../Pagination/Pagination";
import styles from "./Transactions.module.scss";

const Transactions = () => {
  const { transactions } = useTransactions();
  const itemsPerPage = 10;

  // Estado local para controlar a página atual
  const [currentPage, setCurrentPage] = React.useState(1);

  // Lógica para calcular o índice inicial e final dos itens a serem exibidos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ul className={`${styles.list} container`}>
      {currentItems.map((transaction, index) => {
          return (
            <li key={index}>
              <p className={styles.description}>{transaction.description}</p>
              {transaction.type === "entry" ? (
                <p className={styles.entry}>
                  {" "}
                  {/* Formata o valor da propriedade price para o formato de moeda brasileira. */}
                  {Number(transaction.price).toLocaleString("pt-br", {
                    style: "currency", // Formata o valor para o formato de moeda.
                    currency: "BRL", // Define a moeda como Real Brasileiro.
                  })}
                </p>
              ) : (
                <p className={styles.output}>
                  -{" "}
                  {/* Formata o valor da propriedade price para o formato de moeda brasileira. */}
                  {Number(transaction.price).toLocaleString("pt-br", {
                    style: "currency", // Formata o valor para o formato de moeda.
                    currency: "BRL", // Define a moeda como Real Brasileiro.
                  })}
                </p>
              )}
              <p className={styles.category}>{transaction.category}</p>
              <p className={styles.date}>{transaction.date}</p>
            </li>
          );
        })}
      </ul>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={transactions.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Transactions;
