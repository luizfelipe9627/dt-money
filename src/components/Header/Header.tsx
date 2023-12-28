import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { useModal } from "../../context/ModalContext";
import useMedia from "../../hooks/useMedia";

const Header = () => {
  const { setModalTransaction, setModalEdit } = useModal(); // Está chamando as funções atualizadoras do ModalContext através do custom hook useModal.
  const media = useMedia("(max-width: 500px)"); // Está criando uma variável chamada media que recebe o custom hook useMedia que recebe como parâmetro a media query (max-width: 500px), sendo assim, se a tela for menor que 500px, então media será true, caso contrário, será false.

  // Criado uma função chamada handleOpenModal.
  const handleOpenModal = () => {
    setModalEdit(false); // Está setando o modalEdit para false, fazendo com que o modal de edição não abra ou feche.
    setModalTransaction(true); // Está setando o modalTransaction para true, fazendo com que o modal de transação abra ou feche.
  };

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.wrapper} container`}>
        <Logo />

        <Button
          // Se media for true, então passa o tamanho small para o botão, senão, passa o tamanho medium.
          size={media ? "small" : "medium"}
          // Ao clicar no botão, executa a função handleOpenModal.
          onClick={handleOpenModal}
        >
          Nova transação
        </Button>
      </div>
    </header>
  );
};

export default Header;
