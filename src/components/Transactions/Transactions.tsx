import React from "react";
import { useTransactions } from "../../context/TransactionsContext";
import styles from "./Transactions.module.scss";

const Transactions = () => {
  const { transactions } = useTransactions();

  console.log(transactions);

  return (
    <ul className={`${styles.list} container`}>
      {transactions.map((transaction, index) => {
        console.log(typeof transaction.price);
        return (
          <li key={index}>
            <p>{transaction.description}</p>
            <p>{transaction.price}</p>
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
            <p>{transaction.category}</p>
            <p>{transaction.date}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Transactions;
