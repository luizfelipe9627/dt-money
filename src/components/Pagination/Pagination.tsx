import React from "react";
import styles from "./Pagination.module.scss";
import ArrowPrev from "../../assets/ArrowPrev";
import ArrowNext from "../../assets/ArrowNext";

// Criado uma interface chamada PaginationProps que recebe os tipos dos parâmetros.
interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // Está definindo o tipo de setCurrentPage como um useState do tipo number.
}

// Criado um componente chamado Pagination que recebe os parâmetros itemsPerPage, totalItems, currentPage e setCurrentPage do tipo PaginationProps, sendo esse componente responsável por renderizar a paginação.
const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = []; // Criado um array vazio que está sendo atribuído a uma variável chamada pageNumbers.

  const totalPages = Math.ceil(totalItems / itemsPerPage); // O ceil está dividindo o total de itens pelo número de itens por página e arredondando para cima, ou seja, se o total de itens for 10 e o número de itens por página for 3, então o resultado será 4 e será atribuído a uma variável chamada totalPages.

  let startPage = Math.max(1, currentPage - 1); // O max está recebendo dois parâmetros, o primeiro é o número 1 e o segundo é o resultado da subtração do currentPage - 1, ou seja, se o currentPage for 1, então o resultado será 1, senão, será o resultado da subtração do currentPage - 1 e será atribuído a uma variável chamada startPage.
  let endPage = Math.min(totalPages, startPage + 2); // O min está recebendo dois parâmetros, o primeiro é o totalPages e o segundo é o resultado da soma do startPage + 2, ou seja, se o startPage for 1, então o resultado será 3, senão, será o resultado da soma do startPage + 2 e será atribuído a uma variável chamada endPage.

  // Se o endPage menos o startPage for menor que 2, então executa o if.
  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2); // O max está recebendo dois parâmetros, o primeiro é o número 1 e o segundo é o resultado da subtração do endPage - 2, ou seja, se o endPage for 1, então o resultado será 1, senão, será o resultado da subtração do endPage - 2 e será atribuído a uma variável startPage.
  }

  // O for recebe três parâmetros, o primeiro é a variável startPage que é o número inicial, o segundo é a condição que é o startPage menor ou igual ao endPage e o terceiro é o incremento que é o startPage + 1.
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i); // O push está adicionando o i ao array pageNumbers, ou seja, se o startPage for 1 e o endPage for 3, então o array pageNumbers será [1, 2, 3].
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.prev}
        // Quando clicado no botão ele executa a função setCurrentPage que recebe como parâmetro o currentPage - 1.
        onClick={() => setCurrentPage(currentPage - 1)}
        // Se o currentPage for igual a 1, então o botão será desabilitado, senão, será habilitado.
        disabled={currentPage === 1}
      >
        {/* Se o currentPage for igual a 1, então o svg será desabilitado, senão, será habilitado. */}
        <ArrowPrev disabled={currentPage === 1} />
      </button>

      <div className={styles.buttons}>
        {/* O map está percorrendo o array pageNumbers e está retornando um botão para cada item do array pageNumbers. */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            // Quando clicado no botão ele executa a função setCurrentPage que recebe como parâmetro o number do botão clicado.
            onClick={() => setCurrentPage(number)}
            // Se o currentPage for igual ao number, então o botão terá a classe active, senão, não terá.
            className={currentPage === number ? styles.active : ""}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className={styles.next}
        // Quando clicado no botão ele executa a função setCurrentPage que recebe como parâmetro o currentPage + 1.
        onClick={() => setCurrentPage(currentPage + 1)}
        // Se o currentPage for igual ao totalPages, então o botão será desabilitado, senão, será habilitado.
        disabled={currentPage === totalPages}
      >
        {/* Se o currentPage for igual ao totalPages, então o svg será desabilitado, senão, será habilitado. */}
        <ArrowNext disabled={currentPage === totalPages} />
      </button>
    </div>
  );
};

export default Pagination;
