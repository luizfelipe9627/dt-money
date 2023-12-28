import Entry from "../../assets/Entry.svg";
import Output from "../../assets/Output.svg";
import CurrencyDollar from "../../assets/CurrencyDollar.svg";
import { useTransactions } from "../../context/TransactionsContext";
import CardValue from "../CardValue/CardValue";
import styles from "./Values.module.scss";
import useData from "../../hooks/useData";

const Values = () => {
  const { transactions } = useTransactions(); // Está chamando o estado transactions do contexto TransactionsContext.
  const { getLastEntry, getLastOutput, getStartAndEndDate } = useData(); // Está chamando as funções getLastEntry, getLastOutput e getStartAndEndDate do hook useData.

  //Formata o valor da propriedade price para o formato de moeda brasileira.
  const formatBRL = new Intl.NumberFormat("pt-br", {
    style: "currency", // Formata o valor para o formato de moeda.
    currency: "BRL", // Define a moeda como Real Brasileiro.
  });

  // O reduce está percorrendo o array transactions e está retornando o valor total das entradas, o acc começa com o valor 0.
  const totalEntry = transactions.reduce((acc, transaction) => {
    // Se o tipo da transação for entrada, então executa o if, senão, executa o else.
    if (transaction.type === "entry") {
      return acc + transaction.price; // Retorna o valor anterior mais o valor da transação atual.
    } else {
      return acc; // Retorna o valor anterior.
    }
  }, 0);

  // O reduce está percorrendo o array transactions e está retornando o valor total das saídas, o acc começa com o valor 0.
  const totalOutput = transactions.reduce((acc, transaction) => {
    // Se o tipo da transação for saída, então executa o if, senão, executa o else.
    if (transaction.type === "output") {
      return acc + transaction.price; // Retorna o valor anterior mais o valor da transação atual.
    } else {
      return acc; // Retorna o valor anterior.
    }
  }, 0);

  // O reduce está percorrendo o array transactions e está retornando o valor total das entradas menos o valor total das saídas, o acc começa com o valor 0.
  const total = transactions.reduce((acc, transaction) => {
    // Se o tipo da transação for entrada, então executa o if, senão, executa o else.
    if (transaction.type === "entry") {
      return acc + transaction.price; // Retorna o valor anterior mais o valor da transação atual.
    } else {
      return acc - transaction.price; // Retorna o valor anterior menos o valor da transação atual.
    }
  }, 0);

  return (
    <div className={`${styles.values} container`}>
      <CardValue
        // Está definindo o título do card como Entradas.
        title="Entradas"
        // Está definindo o valor do card como o valor total das entradas formatado para o formato de moeda brasileira.
        value={formatBRL.format(totalEntry)}
        // Está definindo a imagem do card como a imagem de uma entrada.
        imgSrc={Entry}
        // Está definindo o texto de informação com o retorno da função getLastEntry.
        info={getLastEntry()}
      />
      <CardValue
        // Está definindo o título do card como Saídas.
        title="Saídas"
        // Está definindo o valor do card como o valor total das saídas formatado para o formato de moeda brasileira.
        value={formatBRL.format(totalOutput)}
        // Está definindo a imagem do card como a imagem de uma saída.
        imgSrc={Output}
        // Está definindo o texto de informação com o retorno da função getLastOutput.
        info={getLastOutput()}
      />
      <CardValue
        // Está definindo o título do card como Total.
        title="Total"
        // Está definindo o valor do card como o valor total formatado para o formato de moeda brasileira.
        value={formatBRL.format(total)}
        // Está definindo a imagem do card como a imagem de um cifrão.
        imgSrc={CurrencyDollar}
        // Está definindo o texto de informação com o retorno da função getStartAndEndDate.
        info={getStartAndEndDate()}
        bgColor="var(--green-dark)"
        colorInfo="var(--gray6)"
      />
    </div>
  );
};

export default Values;
