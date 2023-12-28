import React from "react";
import ButtonSearch from "../Button/ButtonSearch";
import styles from "./Search.module.scss";
import { useTransactions } from "../../context/TransactionsContext";

const Search = () => {
  const [search, setSearch] = React.useState(""); // Criado um estado chamado search e uma função atualizadora chamada setSearch. O estado search está recebendo uma string vazia como valor inicial.
  const { transactions, setTransactions } = useTransactions(); // Está recebendo o estado transactions e a função atualizadora setTransactions do contexto TransactionsContext.

  // Criado uma função chamada handleSearch responsável por filtrar as transações.
  const handleSearch = () => {
    setTransactions([]); // Está setando o estado transactions para um array vazio.

    // O filter está percorrendo o array transactions e está retornando um novo array com as transações encontradas.
    transactions.filter((transaction) => {
      const description = transaction.description.toLowerCase(); // Está criando uma variável chamada description que recebe a descrição da transação em letras minúsculas.
      const searchLowerCase = search.toLowerCase(); // Está criando uma variável chamada searchLowerCase que recebe o valor do estado search em letras minúsculas.

      // Se a descrição da transação incluir o valor do estado search em letras minúsculas, então executa o if.
      if (description.includes(searchLowerCase)) {
        setTransactions((prev) => [...prev, transaction]); // Seta como valor do estado transactions um array que contém as transações encontradas e as transações que já estavam no estado transactions.
      }
    });
  };

  // Criado uma função chamada handleChange responsável por atualizar o estado search toda vez que o usuário digitar algo no input.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value); // Seta o estado search com o valor digitado pelo usuário no input.

    // Se o valor do input for vazio, então executa o if.
    if (event.target.value === "") {
      // Se o localStorage.transactions existir, então então converte o valor do localStorage.transactions para JSON e seta como valor do estado transactions, senão, seta como valor do estado transactions um array vazio.
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
          // Quando o usuário digitar algo no input, executa a função handleChange.
          onChange={handleChange}
          // O valor do input é o valor do estado search.
          value={search}
          placeholder="Busque uma transação"
          className="text-md"
        />
        {/* Quando o usuário clicar no botão, executa a função handleSearch. */}
        <ButtonSearch onClick={handleSearch}>Buscar</ButtonSearch>
      </div>
    </div>
  );
};

export default Search;
