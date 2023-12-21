import React from "react";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";
import { useButtonSelected } from "../../context/ButtonSelectedContext";
import ButtonSelect from "../Button/ButtonSelect";
import X from "../../assets/x.svg";
import { useModal } from "../../context/ModalContext";
import Input from "../Input/Input";
import { useTransactions } from "../../context/TransactionsContext";
import useMedia from "../../hooks/useMedia";

const Modal = () => {
  const { modal, setModal } = useModal();
  const media = useMedia("(max-width: 600px)");
  const { buttonSelected, setButtonSelected } = useButtonSelected();
  const { setTransactions } = useTransactions();
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

  const cleanInputs = () => {
    setSuccessDescription(false);
    setErrorDescription(false);
    setSuccessPrice(false);
    setErrorPrice(false);
    setSuccessCategory(false);
    setErrorCategory(false);
    setButtonSelected(null);
    setInputDescription("");
    setInputPrice("");
    setInputCategory("");
  };

  const handleOutsideClick: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    const target = event.target as HTMLDivElement;
    const currentTarget = event.currentTarget as HTMLDivElement;

    if (target === currentTarget && setModal) {
      setModal(false);
      cleanInputs();
    }
  };

  const handleCloseModal: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (setModal) {
      setModal(false);
      cleanInputs();
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

      setModal(false);
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);

      cleanInputs();

      localStorage.setItem(
        "transactions",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("transactions") || "[]"),
          transaction,
        ]),
      );
    } else {
      inputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
          if (input.value.length === 0) {
            input.classList.add("error");
          }
        }
      });

      if (!isValidButtonsSelected) {
        const buttons = document.querySelectorAll(
          `.${styles.buttonsSelected} button`,
        );

        buttons.forEach((button) => {
          if (button instanceof HTMLButtonElement) {
            button.classList.add("error");
          }
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
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  return (
    <div
      className={`${styles.container} ${modal ? "" : styles.isOpen}`}
      onClick={handleOutsideClick}
    >
      <div className={`${styles.modal} ${modal ? "animeBottom" : ""}`}>
        <button className={styles.close} onClick={handleCloseModal}>
          <img src={X} alt="Fechar modal" title="Fechar modal" />
        </button>

        <h1 className={media ? "headline-sm" : "headline-md"}>
          Nova transação
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
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default Modal;
