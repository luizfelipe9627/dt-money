import Entry from "../../assets/Entry.svg";
import Output from "../../assets/Output.svg";
import CurrencyDollar from "../../assets/CurrencyDollar.svg";
import { useTransactions } from "../../context/TransactionsContext";
import CardValue from "../CardValue/CardValue";
import styles from "./Values.module.scss";
import useData from "../../hooks/useData";

const Values = () => {
  const { transactions } = useTransactions();
  const { getLastEntry, getLastOutput, getStartAndEndDate } = useData();

  //Formata o valor da propriedade price para o formato de moeda brasileira.
  const formatBRL = new Intl.NumberFormat("pt-br", {
    style: "currency", // Formata o valor para o formato de moeda.
    currency: "BRL", // Define a moeda como Real Brasileiro.
  });

  const totalEntry = transactions.reduce((acc, transaction) => {
    if (transaction.type === "entry") {
      return acc + transaction.price;
    } else {
      return acc;
    }
  }, 0);

  const totalOutput = transactions.reduce((acc, transaction) => {
    if (transaction.type === "output") {
      return acc + transaction.price;
    } else {
      return acc;
    }
  }, 0);

  const total = transactions.reduce((acc, transaction) => {
    if (transaction.type === "entry") {
      return acc + transaction.price;
    } else {
      return acc - transaction.price;
    }
  }, 0);

  return (
    <div className={`${styles.values} container`}>
      <CardValue
        title="Entradas"
        value={formatBRL.format(totalEntry)}
        imgSrc={Entry}
        info={getLastEntry()}
      />
      <CardValue
        title="Saídas"
        value={formatBRL.format(totalOutput)}
        imgSrc={Output}
        info={getLastOutput()}
      />
      <CardValue
        title="Total"
        value={formatBRL.format(total)}
        imgSrc={CurrencyDollar}
        bgColor="var(--green-dark)"
        info={getStartAndEndDate()}
        colorInfo="var(--gray6)"
      />
    </div>
  );
};

export default Values;
