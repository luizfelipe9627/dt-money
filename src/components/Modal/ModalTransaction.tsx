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

// Criado um componente chamado ModalTransaction responsável pelo modal de transação.
const ModalTransaction = () => {
  const { modalTransaction, setModalTransaction, modalEdit } = useModal(); // Está pegando os estados modalTransaction, modalEdit e a função atualizadora setModalTransaction do contexto ModalContext.
  const media = useMedia("(max-width: 600px)"); // Está criando uma variável chamada media que recebe o custom hook useMedia que recebe como parâmetro a media query (max-width: 600px), sendo assim, se a tela for menor que 600px, então media será true, caso contrário, será false.
  const { buttonSelected, setButtonSelected } = useButtonSelected(); // Está pegando o estado buttonSelected e a função atualizadora setButtonSelected do contexto ButtonSelectedContext.
  const { transactions, setTransactions, transactionClicked } =
    useTransactions(); // Está pegando o estado transactions ea função atualizadora setTransactions do contexto TransactionsContext.
  const [inputDescription, setInputDescription] = React.useState(""); // Está criando um estado chamado inputDescription e uma função atualizadora setInputDescription. O estado começa com o valor de uma string vazia.
  const [inputPrice, setInputPrice] = React.useState(0); // Está criando um estado chamado inputPrice e uma função atualizadora setInputPrice. O estado começa com o valor de 0.
  const [inputCategory, setInputCategory] = React.useState(""); // Está criando um estado chamado inputCategory e uma função atualizadora setInputCategory. O estado começa com o valor de uma string vazia.
  const [errorDescription, setErrorDescription] = React.useState(false); // Está criando um estado chamado errorDescription e uma função atualizadora setErrorDescription. O estado começa com o valor de false.
  const [errorPrice, setErrorPrice] = React.useState(false); // Está criando um estado chamado errorPrice e uma função atualizadora setErrorPrice. O estado começa com o valor de false.
  const [errorCategory, setErrorCategory] = React.useState(false); // Está criando um estado chamado errorCategory e uma função atualizadora setErrorCategory. O estado começa com o valor de false.
  const [successDescription, setSuccessDescription] = React.useState(false); // Está criando um estado chamado successDescription e uma função atualizadora setSuccessDescription. O estado começa com o valor de false.
  const [successPrice, setSuccessPrice] = React.useState(false); // Está criando um estado chamado successPrice e uma função atualizadora setSuccessPrice. O estado começa com o valor de false.
  const [successCategory, setSuccessCategory] = React.useState(false); // Está criando um estado chamado successCategory e uma função atualizadora setSuccessCategory. O estado começa com o valor de false.
  const [priceFormatted, setPriceFormatted] = React.useState(0); // Está criando um estado chamado priceFormatted e uma função atualizadora setPriceFormatted. O estado começa com o valor de 0.
  const [inputClicked, setInputClicked] = React.useState(false); // Está criando um estado chamado inputClicked e uma função atualizadora setInputClicked. O estado começa com o valor de false.

  const date = new Date(); // Cria uma variável chamada date que recebe a data atual.

  const inputs = document.querySelectorAll(`.${styles.inputs} input`); // Está criando uma variável chamada inputs que recebe todos os elementos que possuem a classe input.

  // Está criando uma variável chamada buttons que recebe todos os elementos que possuem a classe button.
  const buttons = document.querySelectorAll(
    `.${styles.buttonsSelected} button`,
  );

  // Criado uma função chamada cleanInputs responsável por limpar os inputs.
  const cleanInputs = () => {
    setInputDescription(""); // Seta o estado inputDescription como uma string vazia, fazendo com que o input de descrição seja limpo.
    setSuccessDescription(false); // Seta o estado successDescription como false, fazendo com que a classe success seja removida do input.
    setErrorDescription(false); // Seta o estado errorDescription como false, fazendo com que a classe error seja removida do input.
    setInputPrice(0); // Seta o estado inputPrice como 0, fazendo com que o input de preço seja limpo.
    setSuccessPrice(false); // Seta o estado successPrice como false, fazendo com que a classe success seja removida do input.
    setErrorPrice(false); // Seta o estado errorPrice como false, fazendo com que a classe error seja removida do input.
    setInputCategory(""); // Seta o estado inputCategory como uma string vazia, fazendo com que o input de categoria seja limpo.
    setSuccessCategory(false); // Seta o estado successCategory como false, fazendo com que a classe success seja removida do input.
    setErrorCategory(false); // Seta o estado errorCategory como false, fazendo com que a classe error seja removida do input.
    setButtonSelected(null); // Seta o estado buttonSelected como null, fazendo com que nenhum botão seja selecionado.
  };

  // Criado uma função chamada formatCurrency que recebe um valor do tipo number, essa função é responsável por formatar o valor para o padrão de moeda brasileiro.
  const formatCurrency = (value: number) => {
    // Está criando uma variável chamada formattedValue que recebe o valor formatado para o padrão de moeda brasileiro.
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency", // Está definindo o estilo como moeda.
      currency: "BRL", // Está definindo a moeda como real brasileiro.
    })
      // O método format recebe como parâmetro o valor, porém, se o inputClicked for true, então divide o valor por 100, senão, retorna o valor.
      .format(inputClicked ? value / 100 : value);

    return value === 0 ? "" : formattedValue; // Se o valor for igual a 0, retorna uma string vazia, senão, retorna o valor formatado.
  };

  // Criado uma função chamada handleOutsideClick que recebe um evento do tipo React.MouseEvent<HTMLDivElement> e o evento é como parâmetro, sendo essa função responsável por fechar o modal de transação quando o usuário clicar fora do modal.
  const handleOutsideClick: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    const target = event.target as HTMLDivElement; // Está criando uma variável chamada target que recebe o target(elemento que foi clicado) do evento.
    const currentTarget = event.currentTarget as HTMLDivElement; // Está criando uma variável chamada currentTarget que recebe o currentTarget(elemento que executou o evento) do evento.

    // Se o elemento clicado for igual ao elemento que executou o evento e setModalTransaction for true, então executa o if.
    if (target === currentTarget && setModalTransaction) {
      setModalTransaction(false); // Seta o estado modalTransaction como false, fazendo com que o modal de transação seja fechado.
      cleanInputs(); // Executa a função cleanInputs, fazendo com que os inputs sejam limpos.
    }
  };

  // Criado uma função chamada handleCloseModal que recebe um evento do tipo React.MouseEventHandler<HTMLButtonElement>, sendo essa função responsável por fechar o modal de transação quando o usuário clicar no botão de fechar.
  const handleCloseModal: React.MouseEventHandler<HTMLButtonElement> = () => {
    // Se o estado setModalTransaction for true, ou seja, se o modal de transação estiver aberto, então executa o if.
    if (setModalTransaction) {
      cleanInputs(); // Executa a função cleanInputs, fazendo com que os inputs sejam limpos.
      setModalTransaction(false); // Seta o estado modalTransaction como false, fazendo com que o modal de transação seja fechado.
    }
  };

  // Criado uma função chamada handleCreateTransaction responsável por criar a transação.
  const handleCreateTransaction = () => {
    setInputClicked(false); // Reseta o estado inputClicked para false.

    // Está criando uma variável chamada isValidInputs que recebe um array contendo todos os inputs e verifica se todos os inputs possuem a classe success, se sim, retorna true, senão, retorna false.
    const isValidInputs = Array.from(inputs).every(
      (input) => input.classList.contains("success"), // Está verificando se o input possui a classe success.
    );

    const isValidButtonsSelected = buttonSelected ? true : false; // Está criando uma variável chamada isValidButtonsSelected que recebe true se o buttonSelected for true, senão, recebe false.

    // Se isValidInputs e isValidButtonsSelected forem true, então executa o if.
    if (isValidInputs && isValidButtonsSelected) {
      // Está criando uma variável chamada transaction que recebe um objeto contendo a descrição, o preço, a categoria, o tipo e a data da transação.
      const transaction = {
        description: inputDescription, // Está definindo a descrição como o estado inputDescription.
        price: priceFormatted, // Está definindo o preço como o estado priceFormatted.
        category: inputCategory, // Está definindo a categoria como o estado inputCategory.
        type: buttonSelected, // Está definindo o tipo como o estado buttonSelected.
        // Se modalEdit for true, passa a data da transação clicada, senão, passa a data atual formatada.
        date: modalEdit
          ? transactionClicked.date
          : `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      };

      // Se modalEdit for true, então executa o if, senão, executa o else.
      if (modalEdit) {
        // Está criando uma variável chamada index que recebe o index da transação clicada. O findIndex passa por todas as transações, sendo do tipo Tansaction e retorna o index da transação clicada.
        const index = transactions.findIndex(
          (item: Transaction) =>
            item.description === transactionClicked.description, // Se a descrição do item for igual a descrição da transação clicada, retorna o index.
        );

        transactions[index] = transaction; // Está definindo a transação clicada como a transação criada.

        setTransactions((prevTransactions) => {
          // Se o modalEdit for true, então executa o if, senão, executa o else.
          const updatedTransactions = modalEdit
            ? // O map passa por todas as transações, sendo do tipo Transaction e retorna um array com as transações atualizadas.
              prevTransactions.map((item: Transaction) =>
                // Se a descrição do transaction for igual a descrição da transação clicada, retorna a transação, senão, retorna o item.
                item.description === transactionClicked.description
                  ? transaction
                  : item,
              )
            : // Se o modalEdit for false, então passa para o transaction o array de transações e todas as transações criadas.
              [transaction, ...prevTransactions];
          // Está definindo o localStorage com as transações atualizadas.
          localStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions),
          );

          return updatedTransactions; // Retorna as transações atualizadas ao estado transactions.
        });
        localStorage.setItem("transactions", JSON.stringify(transactions)); // Está definindo o localStorage com as transações atualizadas.
      } else {
        // Está definindo o estado transactions com as transações armazenadas no localStorage e todas as transações criadas.
        setTransactions((prevTransactions) => [
          transaction,
          ...prevTransactions,
        ]);
        // Está definindo o localStorage com as transações armazenadas no localStorage.
        localStorage.setItem(
          "transactions",
          // Está convertendo o array de transações para string e armazenando no localStorage, e caso não tenha nada no localStorage, retorna um array vazio.
          JSON.stringify([
            transaction,
            ...JSON.parse(localStorage.getItem("transactions") || "[]"),
          ]),
        );
      }
      setModalTransaction(false); // Seta o estado modalTransaction como false, fazendo com que o modal de transação seja fechado.
      cleanInputs(); // Executa a função cleanInputs, fazendo com que os inputs sejam limpos.
    } else {
      // O forEach passa por todos os inputs e a cada iteração armaena o input no parâmetro input e executa o código dentro do forEach.
      inputs.forEach((input) => {
        // Se o input for do tipo HTMLInputElement executa o if.
        if (input instanceof HTMLInputElement) {
          // se o valor do input for igual a 0, executa o if.
          if (input.value.length === 0) {
            input.classList.add("error"); // Adiciona a classe error ao input.
          }

          // O setTimeout executa uma função após um determinado tempo, nesse caso, após 1.5 segundos executa o código dentro do setTimeout.
          setTimeout(() => {
            input.classList.remove("error"); // Remove a classe error do input.
          }, 1500);
        }
      });

      // Se isValidButtonsSelected for false, ou seja, se o usuário não selecionou o tipo da transação, executa o if.
      if (!isValidButtonsSelected) {
        // O forEach passa por todos os botões e a cada iteração armaena o botão no parâmetro button e executa o código dentro do forEach.
        buttons.forEach((button) => {
          // Se o botão for do tipo HTMLButtonElement executa o if.
          if (button instanceof HTMLButtonElement) {
            button.classList.add("error"); // Adiciona a classe error ao botão.
          }

          // O setTimeout executa uma função após um determinado tempo, nesse caso, após 1.5 segundos executa o código dentro do setTimeout.
          setTimeout(() => {
            button.classList.remove("error"); // Remove a classe error do botão.
          }, 1500);
        });
      }
    }
  };

  // Criado uma função chamada handleInputDescription que recebe um evento do tipo React.ChangeEvent<HTMLInputElement>, sendo essa função responsável por atualizar o estado inputDescription e verificar se o input está vazio.
  const handleInputDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputDescription(event.target.value); // Está definindo o estado inputDescription como o valor que foi digitado no input.

    // Se o valor do input for maior que 0, então executa o if, senão, executa o else.
    if (event.target.value.length > 0) {
      setErrorDescription(false); // Seta o estado errorDescription como false, fazendo com que a classe error seja removida do input.
      setSuccessDescription(true); // Seta o estado successDescription como true, fazendo com que a classe success seja adicionada ao input.
    } else {
      setSuccessDescription(false); // Seta o estado successDescription como false, fazendo com que a classe success seja removida do input.
      setErrorDescription(true); // Seta o estado errorDescription como true, fazendo com que a classe error seja adicionada ao input.
    }
  };

  // Criado uma função chamada handleInputPrice que recebe um evento do tipo React.ChangeEvent<HTMLInputElement>, sendo essa função responsável por atualizar o estado inputPrice e verificar se o input está vazio.
  const handleInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value; // Está criando uma variável chamada rawValue que recebe o valor digitado no input.
    const numericValue = Number(rawValue.replace(/[^0-9]/g, "")); // Está criando uma variável chamada numericValue que recebe o valor digitado no input e através do regexp substitui tudo que não for número por uma string vazia.

    setInputPrice(numericValue); // Está definindo o estado inputPrice como o valor que foi digitado no input.
    setInputClicked(true); // Seta o estado inputClicked como true, fazendo com que o valor seja dividido por 100.
    setPriceFormatted(numericValue / 100); // Está definindo o estado priceFormatted como o valor que foi digitado no input dividido por 100.

    // Se o valor do input for maior que 0, então executa o if, senão, executa o else.
    if (numericValue > 0) {
      setErrorPrice(false); // Seta o estado errorPrice como false, fazendo com que a classe error seja removida do input.
      setSuccessPrice(true); // Seta o estado successPrice como true, fazendo com que a classe success seja adicionada ao input.
    } else {
      setSuccessPrice(false); // Seta o estado successPrice como false, fazendo com que a classe success seja removida do input.
      setErrorPrice(true); // Seta o estado errorPrice como true, fazendo com que a classe error seja adicionada ao input.
    }
  };

  // Criado uma função chamada handleInputCategory que recebe um evento do tipo React.ChangeEvent<HTMLInputElement>, sendo essa função responsável por atualizar o estado inputCategory e verificar se o input está vazio.
  const handleInputCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCategory(event.target.value); // Está definindo o estado inputCategory como o valor que foi digitado no input.

    // Se o valor do input for maior que 0, então executa o if, senão, executa o else.
    if (event.target.value.length > 0) {
      setErrorCategory(false); // Seta o estado errorCategory como false, fazendo com que a classe error seja removida do input.
      setSuccessCategory(true); // Seta o estado successCategory como true, fazendo com que a classe success seja adicionada ao input.
    } else {
      setSuccessCategory(false); // Seta o estado successCategory como false, fazendo com que a classe success seja removida do input.
      setErrorCategory(true); // Seta o estado errorCategory como true, fazendo com que a classe error seja adicionada ao input.
    }
  };

  // Criado um useEffect que é executado toda vez que o modalEdit, modalTransaction ou transactionClicked mudarem de valor.
  React.useEffect(() => {
    // Se modalEdit e modalTransaction forem true, então executa o if.
    if (modalEdit && modalTransaction) {
      setInputDescription(transactionClicked.description || ""); // Está definindo o estado inputDescription como a descrição da transação clicada.
      setSuccessDescription(true); // Seta o estado successDescription como true, fazendo com que a classe success seja adicionada ao input.
      setInputPrice(transactionClicked.price || 0); // Está definindo o estado inputPrice como o preço da transação clicada, ou 0 caso não tenha preço.
      setSuccessPrice(true); // Seta o estado successPrice como true, fazendo com que a classe success seja adicionada ao input.
      setInputCategory(transactionClicked.category || ""); // Está definindo o estado inputCategory como a categoria da transação clicada ou uma string vazia caso não tenha categoria.
      setSuccessCategory(true); // Seta o estado successCategory como true, fazendo com que a classe success seja adicionada ao input.
      setButtonSelected(transactionClicked.type || null); // Está definindo o estado buttonSelected como o tipo da transação clicada ou null caso não tenha tipo.
      setPriceFormatted(transactionClicked.price); // Seta o estado priceFormatted como o preço da transação clicada.
    }
  }, [modalEdit, modalTransaction, transactionClicked]);

  // Criado um useEffect que é executado toda vez que o modalTransaction mudar de valor.
  React.useEffect(() => {
    // Se modalTransaction for true, ou seja, se o modal de transação estiver aberto, então executa o if, senão, executa o else.
    if (modalTransaction) {
      document.body.style.overflow = "hidden"; // Define o overflow do body como hidden, fazendo com que o usuário não consiga rolar a página.
    } else {
      document.body.style.overflow = "auto"; // Define o overflow do body como auto, fazendo com que o usuário consiga rolar a página.
    }
  }, [modalTransaction]);

  return (
    <div
      // Se modalTransaction for true, então passa uma string vazia, senão, a classe isOpen é passada.
      className={`${styles.container} 
      ${modalTransaction ? "" : styles.isOpen}`}
      // Quando o elemento for clicado, aciona o onClick que executa a função handleOutsideClick, responsável por fechar o modal quando o usuário clicar fora do modal.
      onClick={handleOutsideClick}
    >
      <div
        // Se modalTransaction for true, então passa a classe animeBottom, senão, uma string vazia.
        className={`${styles.modalTransaction} ${
          modalTransaction ? "animeBottom" : ""
        }`}
      >
        <button
          className={styles.close}
          // Quando o botão for clicado, aciona o onClick que executa a função handleCloseModal, responsável por fechar o modal quando o usuário clicar no botão de fechar.
          onClick={handleCloseModal}
        >
          <img src={X} alt="Fechar modal" title="Fechar modal" />
        </button>

        <h1
          // Se media for true, então passa a classe headline-sm, senão, a classe headline-md é passada.
          className={media ? "headline-sm" : "headline-md"}
        >
          {/* Se modalEdit for true, então passa a string "Editar transação", senão, passa a string "Nova transação". */}
          {modalEdit ? "Editar transação" : "Nova transação"}
        </h1>

        <div className={styles.inputs}>
          <Input
            type="text"
            placeholder="Descrição"
            // Passa o estado inputDescription como valor do input.
            value={inputDescription}
            // Quando o valor do input for alterado, aciona o onChange que executa a função handleInputDescription, responsável por atualizar o estado inputDescription e verificar se o input está vazio.
            onChange={handleInputDescription}
            // Passa o estado successDescription no sucess, sendo essa função responsável por adicionar a classe success ao input.
            success={successDescription}
            // Passa o estado errorDescription no error, sendo essa função responsável por adicionar a classe error ao input.
            error={errorDescription}
          />
          <Input
            type="text"
            placeholder="Preço"
            // Como valor do input se inputClicked for true, então passa o estado priceFormatted multiplicado por 100, senão, passa o estado inputPrice, ambos já formatados para o padrão de moeda brasileiro através da função formatCurrency.
            value={formatCurrency(
              inputClicked ? priceFormatted * 100 : inputPrice,
            )}
            // Quando o valor do input for alterado, aciona o onChange que executa a função handleInputPrice, responsável por atualizar o estado inputPrice e verificar se o input está vazio.
            onChange={handleInputPrice}
            // Passa o estado successPrice no sucess, sendo essa função responsável por adicionar a classe success ao input.
            success={successPrice}
            // Passa o estado errorPrice no error, sendo essa função responsável por adicionar a classe error ao input.
            error={errorPrice}
          />
          <Input
            type="text"
            placeholder="Categoria"
            // Passa o estado inputCategory como valor do input.
            value={inputCategory}
            // Quando o valor do input for alterado, aciona o onChange que executa a função handleInputCategory, responsável por atualizar o estado inputCategory e verificar se o input está vazio.
            onChange={handleInputCategory}
            // Passa o estado successCategory no sucess, sendo essa função responsável por adicionar a classe success ao input.
            success={successCategory}
            // Passa o estado errorCategory no error, sendo essa função responsável por adicionar a classe error ao input.
            error={errorCategory}
          />
        </div>

        <div className={styles.buttonsSelected}>
          <ButtonSelect type="output">Saída</ButtonSelect>
          <ButtonSelect type="entry">Entrada</ButtonSelect>
        </div>

        <Button
          size="medium"
          // Quando o botão for clicado, aciona o onClick que executa a função handleCreateTransaction, responsável por criar a transação.
          onClick={handleCreateTransaction}
        >
          {/* Se modalEdit for true, então passa a string "Atualizar", senão, passa a string "Cadastrar". */}
          {modalEdit ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default ModalTransaction;
