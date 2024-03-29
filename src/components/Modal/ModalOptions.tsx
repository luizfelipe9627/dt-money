import React from "react";
import Button from "../Button/Button";
import styles from "./ModalOptions.module.scss";
import X from "../../assets/X.svg";
import { useModal } from "../../context/ModalContext";
import { useTransactions } from "../../context/TransactionsContext";

const ModalOptions = () => {
  const { setModalTransaction, modalOptions, setModalOptions, setModalEdit } =
    useModal();
  const { transactions, removeTransaction, transactionClicked } =
    useTransactions();

  const handleOutsideClick: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    const target = event.target as HTMLDivElement;
    const currentTarget = event.currentTarget as HTMLDivElement;

    if (target === currentTarget && setModalOptions) {
      setModalOptions(false);
    }
  };

  const handleCloseModal: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (setModalOptions) {
      setModalOptions(false);
    }
  };

  React.useEffect(() => {
    if (modalOptions) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOptions]);

  function handleRemoveTransaction() {
    transactions.forEach((item, index) => {
      // Se a descrição do item do forEach for igual a descrição da transação clicada, remove a transação.
      if (item.description === transactionClicked.description) {
        removeTransaction(index); // Executa a função removeTransaction do TransactionsContext responsável por remover a transação.
        setModalOptions(false); // Fecha o modal de opções.
      }
    });
  }

  function handleEditTransaction() {
    setModalOptions(false); // Fecha o modal de opções.
    // Abre o modal de edição e passa a transação clicada para o modal.
    if (setModalTransaction) {
      setModalTransaction(true);
      setModalEdit(true);
    }
  }

  return (
    <div
      className={`${styles.container} ${modalOptions ? "" : styles.isOpen}`}
      onClick={handleOutsideClick}
    >
      <div
        className={`${styles.modalOptions} ${
          modalOptions ? "animeBottom" : ""
        }`}
      >
        <button className={styles.close} onClick={handleCloseModal}>
          <img src={X} alt="Fechar modal" title="Fechar modal" />
        </button>

        <h1>O que deseja fazer com essa transação?</h1>

        <div className={styles.buttons}>
          <Button size="medium" onClick={() => handleEditTransaction()}>
            Quero editar
          </Button>
          <Button size="medium" onClick={() => handleRemoveTransaction()}>
            Quero deletar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalOptions;
