import React from "react";
import styles from "./ModalTransaction.module.scss";
import Button from "../Button/Button";
import { useButtonSelected } from "../../context/ButtonSelectedContext";
import ButtonSelect from "../Button/ButtonSelect";
import X from "../../assets/X.svg";
import { useModal } from "../../context/ModalContext";
import Input from "../Input/Input";
import { useTransactions } from "../../context/TransactionsContext";
import useMedia from "../../hooks/useMedia";

const ModalTransaction = () => {
  const { modalTransaction, setModalTransaction, modalEdit } = useModal();
  const media = useMedia("(max-width: 600px)");
  const { buttonSelected, setButtonSelected } = useButtonSelected();
  const { transactions, setTransactions, transactionClicked } =
    useTransactions();
  const [inputDescription, setInputDescription] = React.useState("");
  const [inputPrice, setInputPrice] = React.useState("");
  const [inputCategory, setInputCategory] = React.useState("");
  const [errorDescription, setErrorDescription] = React.useState(false);
  const [errorPrice, setErrorPrice] = React.useState(false);
  const [errorCategory, setErrorCategory] = React.useState(false);
  const [successDescription, setSuccessDescription] = React.useState(false);
  const [successPrice, setSuccessPrice] = React.useState(false);
  const [successCategory, setSuccessCategory] = React.useState(false);
  const date = new Date();
  const inputs = document.querySelectorAll(`.${styles.inputs} input`);
  const buttons = document.querySelectorAll(
    `.${styles.buttonsSelected} button`,
  );

  const cleanInputs = () => {
    setInputDescription("");
    setSuccessDescription(false);
    setErrorDescription(false);

    setInputPrice("");
    setSuccessPrice(false);
    setErrorPrice(false);

    setInputCategory("");
    setSuccessCategory(false);
    setErrorCategory(false);

    setButtonSelected(null);
  };

  const handleOutsideClick: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    const target = event.target as HTMLDivElement;
    const currentTarget = event.currentTarget as HTMLDivElement;

    if (target === currentTarget && setModalTransaction) {
      setModalTransaction(false);
      cleanInputs();
    }
  };

  const handleCloseModal: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (setModalTransaction) {
      cleanInputs();
      setModalTransaction(false);
    }
  };

  const handleCreateTransaction = () => {
    const isValidInputs = Array.from(inputs).every((input) =>
      input.classList.contains("success"),
    );

    const isValidButtonsSelected = buttonSelected ? true : false;

    if (isValidInputs && isValidButtonsSelected) {
      const transaction = {
        description: inputDescription,
        price: inputPrice,
        category: inputCategory,
        type: buttonSelected,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      };

      if (modalEdit) {
        const index = transactions.findIndex(
          (item: TransactionsProps) =>
            item.description === transactionClicked.description,
        );
        transactions[index] = transaction;
        setTransactions((prevTransactions) => {
          const updatedTransactions = modalEdit
            ? prevTransactions.map((item: TransactionsProps) =>
                item.description === transactionClicked.description
                  ? transaction
                  : item,
              )
            : [transaction, ...prevTransactions];

          localStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions),
          );

          return updatedTransactions;
        });
        localStorage.setItem("transactions", JSON.stringify(transactions));
      } else {
        setTransactions((prevTransactions) => [
          transaction,
          ...prevTransactions,
        ]);
        localStorage.setItem(
          "transactions",
          JSON.stringify([
            transaction,
            ...JSON.parse(localStorage.getItem("transactions") || "[]"),
          ]),
        );
      }

      setModalTransaction(false);
      cleanInputs();
    } else {
      inputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
          if (input.value.length === 0) {
            input.classList.add("error");
          }

          setTimeout(() => {
            input.classList.remove("error");
          }, 1500);
        }
      });

      if (!isValidButtonsSelected) {
        buttons.forEach((button) => {
          if (button instanceof HTMLButtonElement) {
            button.classList.add("error");
          }

          setTimeout(() => {
            button.classList.remove("error");
          }, 1500);
        });
      }
    }
  };

  const handleInputDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputDescription(event.target.value);

    if (event.target.value.length > 0) {
      setErrorDescription(false);
      setSuccessDescription(true);
    } else {
      setSuccessDescription(false);
      setErrorDescription(true);
    }
  };

  const handleInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(event.target.value);

    if (event.target.value.length > 0) {
      setErrorPrice(false);
      setSuccessPrice(true);
    } else {
      setSuccessPrice(false);
      setErrorPrice(true);
    }
  };

  const handleInputCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCategory(event.target.value);

    if (event.target.value.length > 0) {
      setErrorCategory(false);
      setSuccessCategory(true);
    } else {
      setSuccessCategory(false);
      setErrorCategory(true);
    }
  };

  React.useEffect(() => {
    if (modalEdit && modalTransaction) {
      setInputDescription(transactionClicked.description || "");
      setSuccessDescription(true);
      setInputPrice(transactionClicked.price || "");
      setSuccessPrice(true);
      setInputCategory(transactionClicked.category || "");
      setSuccessCategory(true);
      setButtonSelected(transactionClicked.type || null);
    }
  }, [modalEdit, modalTransaction, transactionClicked]);

  React.useEffect(() => {
    if (modalTransaction) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalTransaction]);

  return (
    <div
      className={`${styles.container} ${modalTransaction ? "" : styles.isOpen}`}
      onClick={handleOutsideClick}
    >
      <div
        className={`${styles.modalTransaction} ${
          modalTransaction ? "animeBottom" : ""
        }`}
      >
        <button className={styles.close} onClick={handleCloseModal}>
          <img src={X} alt="Fechar modal" title="Fechar modal" />
        </button>

        <h1 className={media ? "headline-sm" : "headline-md"}>
          {modalEdit ? "Editar transação" : "Nova transação"}
        </h1>

        <div className={styles.inputs}>
          <Input
            type="text"
            placeholder="Descrição"
            value={inputDescription}
            onChange={handleInputDescription}
            success={successDescription}
            error={errorDescription}
          />
          <Input
            type="number"
            placeholder="Preço"
            value={inputPrice}
            onChange={handleInputPrice}
            success={successPrice}
            error={errorPrice}
          />
          <Input
            type="text"
            placeholder="Categoria"
            value={inputCategory}
            onChange={handleInputCategory}
            success={successCategory}
            error={errorCategory}
          />
        </div>

        <div className={styles.buttonsSelected}>
          <ButtonSelect type="output">Saída</ButtonSelect>
          <ButtonSelect type="entry">Entrada</ButtonSelect>
        </div>

        <Button size="medium" onClick={handleCreateTransaction}>
          {modalEdit ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default ModalTransaction;