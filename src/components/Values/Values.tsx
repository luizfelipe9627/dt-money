import Entry from "../../assets/entry.svg";
import Output from "../../assets/output.svg";
import CurrencyDollar from "../../assets/currencyDollar.svg";
import { useTransactions } from "../../context/TransactionsContext";
import CardValue from "../CardValue/CardValue";
import styles from "./Values.module.scss";

const Values = () => {
  const { transactions } = useTransactions();

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

  return (
    <div className={`${styles.values} container`}>
      <CardValue
        title="Entradas"
        value={totalEntry.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
        imgSrc={Entry}
      />
      <CardValue
        title="Saídas"
        value={totalOutput.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
        imgSrc={Output}
      />
      <CardValue
        title="Total"
        value={total.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
        imgSrc={CurrencyDollar}
        bgColor="var(--green-dark)"
      />
    </div>
  );
};

export default Values;
