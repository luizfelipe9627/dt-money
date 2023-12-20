import React from "react";
import styles from "./Pagination.module.scss";
import ArrowPrev from "../../assets/ArrowPrev";
import ArrowNext from "../../assets/ArrowNext";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = [];

  // Calcular o número total de páginas
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Determinar os números de página a serem exibidos
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  // Ajustar os números de página para sempre exibir 3 botões
  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.prev}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowPrev disabled={currentPage === 1} />
      </button>

      <div className={styles.buttons}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? styles.active : ""}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className={styles.next}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowNext disabled={currentPage === totalPages} />
      </button>
    </div>
  );
};

export default Pagination;
