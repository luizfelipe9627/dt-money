import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { useModal } from "../../context/ModalContext";
import Card from "../Card/Card";
import Entry from "../../assets/entry.svg";
import Output from "../../assets/output.svg";
import CurrencyDollar from "../../assets/currencyDollar.svg";
import { useTransactions } from "../../context/TransactionsContext";

const Header = () => {
  const { setModal } = useModal();
  const { transactions } = useTransactions();
  console.log(transactions);

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
  console.log(total);

  return (
    <>
      <header className={`${styles.header}`}>
        <div className={`${styles.wrapper} container`}>
          <Logo />

          <Button size="medium" onClick={() => setModal(true)}>
            Nova transação
          </Button>
        </div>
      </header>

      <div className={`${styles.statistics} container`}>
        <Card
          title="Entradas"
          value={totalEntry.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
          imgSrc={Entry}
        />
        <Card
          title="Saídas"
          value={totalOutput.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
          imgSrc={Output}
        />
        <Card
          title="Total"
          value={total.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
          imgSrc={CurrencyDollar}
          bgColor="var(--green-dark)"
        />
      </div>
    </>
  );
};

export default Header;
