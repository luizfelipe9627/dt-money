import React from "react";
import ButtonSearch from "../Button/ButtonSearch";
import styles from "./Search.module.scss";
import { useTransactions } from "../../context/TransactionsContext";
import useMedia from "../../hooks/useMedia";

const Search = () => {
  const [search, setSearch] = React.useState("");
  const { transactions, setTransactions } = useTransactions();
  const media = useMedia("(max-width: 850px)");

  const handleSearch = () => {
    setTransactions([]);

    transactions.filter((transaction) => {
      const description = transaction.description.toLowerCase();
      const searchLowerCase = search.toLowerCase();

      if (description.includes(searchLowerCase)) {
        setTransactions((prev) => [...prev, transaction]);
      }
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);

    if (event.target.value === "") {
      setTransactions(
        localStorage.transactions ? JSON.parse(localStorage.transactions) : [],
      );
    }
  };

  return (
    <div className={styles.search}>
      <div className={`${styles.wrapper} container`}>
        <input
          type="text"
          onChange={handleChange}
          value={search}
          placeholder="Busque uma transação"
          className="text-md"
        />
        <ButtonSearch onClick={handleSearch}>
          {media ? "" : "Buscar"}
        </ButtonSearch>
      </div>
    </div>
  );
};

export default Search;
