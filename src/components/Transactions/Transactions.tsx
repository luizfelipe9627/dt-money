import React from "react";
import { useTransactions } from "../../context/TransactionsContext";
import Pagination from "../Pagination/Pagination";
import styles from "./Transactions.module.scss";

interface TransactionsProps {
  description: string;
  price: string;
  category: string;
  date: string;
  type: string | null;
}

const Transactions = () => {
  const { transactions } = useTransactions();
  const itemsPerPage = 10;

  // Estado local para controlar a página atual
  const [currentPage, setCurrentPage] = React.useState(1);

  // Lógica para calcular o índice inicial e final dos itens a serem exibidos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  //Formata o valor da propriedade price para o formato de moeda brasileira.
  const formatBRL = new Intl.NumberFormat("pt-br", {
    style: "currency", // Formata o valor para o formato de moeda.
    currency: "BRL", // Define a moeda como Real Brasileiro.
  });

  const handleClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    transaction: TransactionsProps,
  ) => {
    console.log("Clicou em:", transaction);
    console.log("Evento:", event.pageX, event.pageY);
  };

  return (
    <div className={styles.transactions}>
      <ul className={`${styles.list} container`}>
        {currentItems.map((transaction, index) => {
          return (
            <li
              key={index}
              onClick={(event) => handleClick(event, transaction)}
            >
              <p className={styles.description}>{transaction.description}</p>
              {transaction.type === "entry" ? (
                <p className={styles.entry}>
                  {formatBRL.format(Number(transaction.price))}
                </p>
              ) : (
                <p className={styles.output}>
                  - {formatBRL.format(Number(transaction.price))}
                </p>
              )}
              <p className={styles.category}>{transaction.category}</p>
              <p className={styles.date}>{transaction.date}</p>
            </li>
          );
        })}
      </ul>

      {transactions.length > 10 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={transactions.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Transactions;
