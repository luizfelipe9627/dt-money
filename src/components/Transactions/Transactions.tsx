import React from "react";
import { useTransactions } from "../../context/TransactionsContext";
import Pagination from "../Pagination/Pagination";
import styles from "./Transactions.module.scss";
import useMedia from "../../hooks/useMedia";
import CalendarBlank from "../../assets/CalendarBlank.svg";
import TagSimple from "../../assets/TagSimple.svg";
import { useModal } from "../../context/ModalContext";

const Transactions = () => {
  const { transactions, setTransactionClicked } = useTransactions(); // Está chamando o estado transactions e a função atualizadora setTransactionClicked do contexto TransactionsContext.
  const media = useMedia("(max-width: 850px)"); // Está criando uma variável chamada media que recebe o custom hook useMedia que recebe como parâmetro a media query (max-width: 850px), sendo assim, se a tela for menor que 850px, então media será true, caso contrário, será false.
  const { setModalOptions } = useModal(); // Está chamando a função atualizadora setModalOptions do contexto ModalContext.
  const [currentPage, setCurrentPage] = React.useState(1); // Criado um estado chamado currentPage e uma função atualizadora chamada setCurrentPage. O estado currentPage começa com o valor 1.

  const itemsPerPage = 10; // Criado uma constante chamada itemsPerPage e definido o valor 10.
  const indexOfLastItem = currentPage * itemsPerPage; // Criado uma constante chamada indexOfLastItem que recebe o valor da página atual multiplicado pelo número de itens por página, ou seja, se a página atual for 1, então indexOfLastItem será 10, se a página atual for 2, então indexOfLastItem será 20, se a página atual for 3, então indexOfLastItem será 30 e assim por diante.
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Criado uma constante chamada indexOfFirstItem que recebe o valor da última página menos o número de itens por página, ou seja, se a página atual for 1, então indexOfFirstItem será 0, se a página atual for 2, então indexOfFirstItem será 10, se a página atual for 3, então indexOfFirstItem será 20 e assim por diante.
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem); // Criado uma constante chamada currentItems que recebe um array com os itens da página atual, o slice está sendo responsável por pegar os itens do indexOfFirstItem até o indexOfLastItem.

  //Formata o valor da propriedade price para o formato de moeda brasileira.
  const formatBRL = new Intl.NumberFormat("pt-br", {
    style: "currency", // Formata o valor para o formato de moeda.
    currency: "BRL", // Define a moeda como Real Brasileiro.
  });

  // Criado uma função chamada handleOpenModal que recebe como parâmetro uma transação, sendo a função responsável por abrir o modal de opções.
  const handleOpenModal = (transaction: Transaction) => {
    setModalOptions(true); // Está setando o modalOptions para true, fazendo com que o modal de opções abra ou feche.
    setTransactionClicked(transaction); // Está setando o transactionClicked para a transação que foi passada como parâmetro, ou seja, está setando o transactionClicked para a transação que foi clicada.
  };

  return (
    <div className={styles.transactions}>
      <ul className={`${styles.list} container`}>
        {currentItems.map((transaction, index) => {
          return (
            <li
              key={index}
              // Quando o usuário clicar no li, então executa a função handleOpenModal passando como parâmetro a transação que foi clicada.
              onClick={() => handleOpenModal(transaction)}
              title="Abrir opções"
            >
              <p className={`${styles.description} text-md`}>
                {transaction.description}
              </p>
              {/* Se o tipo da transação for entrada, então executa o if, senão, executa o else. */}
              {transaction.type === "entry" ? (
                <p
                  // Se media for true, então passa a classe headline-sm, senão, passa a classe text-md.
                  className={`${styles.entry} ${
                    media ? "headline-sm" : "text-md"
                  }`}
                >
                  {/* Formata o valor da propriedade price para o formato de moeda brasileira. */}
                  {formatBRL.format(transaction.price)}
                </p>
              ) : (
                <p
                  // Se media for true, então passa a classe headline-sm, senão, passa a classe text-md.
                  className={`${styles.output} ${
                    media ? "headline-sm" : "text-md"
                  }`}
                >
                  {/* Formata o valor da propriedade price para o formato de moeda brasileira. */}
                  - {formatBRL.format(transaction.price)}
                </p>
              )}
              {/* Se media for true, então executa a div, senão, executa o p. */}
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
              {/* Se media for true, então executa a div, senão, executa o p. */}
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

      {/* Se o tamanho do array transactions for maior que 10, então executa a paginação. */}
      {transactions.length > 10 && (
        <Pagination
          // Passa como propriedade o número de itens por página.
          itemsPerPage={itemsPerPage}
          // Passa como propriedade o número total de transações.
          totalItems={transactions.length}
          // Passa como propriedade a página atual.
          currentPage={currentPage}
          // Passa como propriedade a função atualizadora da página atual.
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Transactions;
