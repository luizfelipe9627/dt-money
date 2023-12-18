import { useTransactions } from "../../context/TransactionsContext";
import styles from "./Transactions.module.scss";

const Transactions = () => {
  const { transactions } = useTransactions();

  return (
    <ul className={`${styles.list} container`}>
      {transactions.map((transaction, index) => {
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
  );
};

export default Transactions;
