import React from "react";
import { useTransactions } from "../../context/TransactionsContext";
import Pagination from "../Pagination/Pagination";
import styles from "./Transactions.module.scss";
import useMedia from "../../hooks/useMedia";
import CalendarBlank from "../../assets/CalendarBlank.svg";
import TagSimple from "../../assets/TagSimple.svg";
import { useModal } from "../../context/ModalContext";

const Transactions = () => {
  const { transactions, setTransactionClicked } = useTransactions();
  const itemsPerPage = 10;
  const media = useMedia("(max-width: 850px)");
  const { setModalOptions } = useModal();

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

  const handleOpenModal = (transaction: Transaction) => {
    setModalOptions(true);
    setTransactionClicked(transaction);
  };

  return (
    <div className={styles.transactions}>
      <ul className={`${styles.list} container`}>
        {currentItems.map((transaction, index) => {
          return (
            <li
              key={index}
              onClick={() => handleOpenModal(transaction)}
              title="Abrir opções"
            >
              <p className={`${styles.description} text-md`}>
                {transaction.description}
              </p>
              {transaction.type === "entry" ? (
                <p
                  className={`${styles.entry} ${
                    media ? "headline-sm" : "text-md"
                  }`}
                >
                  {formatBRL.format(transaction.price)}
                </p>
              ) : (
                <p
                  className={`${styles.output} ${
                    media ? "headline-sm" : "text-md"
                  }`}
                >
                  - {formatBRL.format(transaction.price)}
                </p>
              )}
              {media ? (
                <div className={styles.categoryMedia}>
                  <img src={TagSimple} alt="Tag simples" />
                  <p className={`${styles.category} text-md`}>
                    {transaction.category}
                  </p>
                </div>
              ) : (
                <p className={`${styles.category} text-md`}>
                  {transaction.category}
                </p>
              )}
              {media ? (
                <div className={styles.dateMedia}>
                  <img src={CalendarBlank} alt="Calendário vazio" />
                  <p className={`${styles.date} text-md`}>{transaction.date}</p>
                </div>
              ) : (
                <p className={`${styles.date} text-md`}>{transaction.date}</p>
              )}
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
