import React from "react";
import Button from "../Button/Button";
import styles from "./ModalOptions.module.scss";
import X from "../../assets/X.svg";
import useMedia from "../../hooks/useMedia";
import { useModal } from "../../context/ModalContext";
import { useTransactions } from "../../context/TransactionsContext";

// Criado um componente chamado ModalOptions responsável pelo modal de opções.
const ModalOptions = () => {
  const { setModalTransaction, modalOptions, setModalOptions, setModalEdit } =
    useModal(); // Está chamando os estados e funções atualizadoras do ModalContext através do custom hook useModal.
  const { transactions, removeTransaction, transactionClicked } =
    useTransactions(); // Está chamando os estados transactions, removeTransaction e a função transactionClicked do TransactionsContext através do custom hook useTransactions.

  const media = useMedia("(max-width: 600px)"); // Está criando uma variável chamada media que recebe o custom hook useMedia que recebe como parâmetro a media query (max-width: 600px), sendo assim, se a tela for menor que 600px, então media será true, caso contrário, será false.

  // Criado uma função chamada handleOutsideClick que recebe um evento do tipo React.MouseEvent<HTMLDivElement> e o evento é como parâmetro, sendo essa função responsável por fechar o modal de opções quando o usuário clicar fora do modal.
  const handleOutsideClick: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    const target = event.target as HTMLDivElement; // Está criando uma variável chamada target que recebe o target(elemento que foi clicado) do evento.
    const currentTarget = event.currentTarget as HTMLDivElement; // Está criando uma variável chamada currentTarget que recebe o currentTarget(elemento que executou o evento) do evento.

    // Se o elemento clicado for igual ao elemento que executou o evento e setModalOptions for true, então executa o if.
    if (target === currentTarget && setModalOptions) {
      setModalOptions(false); // Seta o estado modalOptions como false, fazendo com que o modal de opções seja fechado.
    }
  };

  // Criado uma função chamada handleCloseModal que recebe um evento do tipo React.MouseEvent<HTMLButtonElement>, sendo essa função responsável por fechar o modal de opções quando o usuário clicar no botão de fechar.
  const handleCloseModal: React.MouseEventHandler<HTMLButtonElement> = () => {
    // Se setModalOptions for true, ou seja, se o modal de opções estiver aberto, então executa o if.
    if (setModalOptions) {
      setModalOptions(false); // Seta o estado modalOptions como false, fazendo com que o modal de opções seja fechado.
    }
  };

  // Criado um useEffect que é executado toda vez que o modalOptions mudar de valor.
  React.useEffect(() => {
    // Se modalOptions for true, ou seja, se o modal de opções estiver aberto, então executa o if, senão, executa o else.
    if (modalOptions) {
      document.body.style.overflow = "hidden"; // Define o overflow do body como hidden, fazendo com que o usuário não consiga rolar a página.
    } else {
      document.body.style.overflow = "auto"; // Define o overflow do body como auto, fazendo com que o usuário consiga rolar a página.
    }
  }, [modalOptions]);

  // Criado uma função chamada handleRemoveTransaction responsável por remover a transação.
  function handleRemoveTransaction() {
    transactions.forEach((item, index) => {
      // Se a descrição do item do forEach for igual a descrição da transação clicada, remove a transação.
      if (item.description === transactionClicked.description) {
        removeTransaction(index); // Executa a função removeTransaction do TransactionsContext responsável por remover a transação, passando o index como parâmetro.
        setModalOptions(false); // Seta o estado modalOptions como false, fazendo com que o modal de opções seja fechado.
      }
    });
  }

  // Criado uma função chamada handleEditTransaction responsável por abrir o modal de edição.
  function handleEditTransaction() {
    setModalOptions(false); // Seta o estado modalOptions como false, fazendo com que o modal de opções seja fechado.

    // Se setModalTransaction for true, então executa o if.
    if (setModalTransaction) {
      setModalTransaction(true); // Seta o estado modalTransaction como true, fazendo com que o modal de transação seja aberto.
      setModalEdit(true); // Seta o estado modalEdit como true, fazendo com que o modal de edição seja aberto.
    }
  }

  return (
    <div
      // Se modalOptions for true, então passa a classe isOpen, senão, não passa nada.
      className={`${styles.container} ${modalOptions ? "" : styles.isOpen}`}
      // Quando o elemento for clicado, aciona o onClick que executa a função handleOutsideClick.
      onClick={handleOutsideClick}
    >
      <div
        // Se modalOptions for true, então passa a classe animeBottom, senão, não passa nada.
        className={`${styles.modalOptions} ${
          modalOptions ? "animeBottom" : ""
        }`}
      >
        <button className={styles.close} onClick={handleCloseModal}>
          <img src={X} alt="Fechar modal" title="Fechar modal" />
        </button>

        {/* Se media for true então passa a classe headline-sm, senão, passa a classe headline-md. */}
        <h1 className={media ? "headline-sm" : "headline-md"}>
          O que deseja fazer com essa transação?
        </h1>

        <div className={styles.buttons}>
          {/* Chama o componente Button e defini a propriadade size como medium e a função onClick como handleEditTransaction e o filho sendo Quero editar. */}
          <Button size="medium" onClick={() => handleEditTransaction()}>
            Quero editar
          </Button>
          {/* Chama o componente Button e defini a propriadade size como medium e a função onClick como handleRemoveTransaction e o filho sendo Quero deletar. */}
          <Button size="medium" onClick={() => handleRemoveTransaction()}>
            Quero deletar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalOptions;
