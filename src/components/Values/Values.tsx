import Entry from "../../assets/entry.svg";
import Output from "../../assets/output.svg";
import CurrencyDollar from "../../assets/currencyDollar.svg";
import { useTransactions } from "../../context/TransactionsContext";
import CardValue from "../CardValue/CardValue";
import styles from "./Values.module.scss";
import useData from "../../hooks/useData";

const Values = () => {
  const { transactions } = useTransactions();
  const { getLastEntry, getLastOutput, getStartAndEndDate } = useData();

  const total = transactions.reduce((acc, transaction) => {
    if (transaction.type === "entry") {
      return acc + Number(transaction.price);
    } else {
      return acc - Number(transaction.price);
    }
  }, 0);

  const totalEntry = transactions.reduce((acc, transaction) => {
    if (transaction.type === "entry") {
      return acc + Number(transaction.price);
    } else {
      return acc;
    }
  }, 0);

  const totalOutput = transactions.reduce((acc, transaction) => {
    if (transaction.type === "output") {
      return acc + Number(transaction.price);
    } else {
      return acc;
    }
  }, 0);

  //Formata o valor da propriedade price para o formato de moeda brasileira.
  const formatBRL = new Intl.NumberFormat("pt-br", {
    style: "currency", // Formata o valor para o formato de moeda.
    currency: "BRL", // Define a moeda como Real Brasileiro.
  });

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
