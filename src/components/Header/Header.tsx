import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { useModal } from "../../context/ModalContext";
import useMedia from "../../hooks/useMedia";

const Header = () => {
  const { setModalTransaction, setModalEdit } = useModal();
  const media = useMedia("(max-width: 500px)");

  const handleOpenModal = () => {
    setModalEdit(false);
    setModalTransaction(true);
  };

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.wrapper} container`}>
        <Logo />

        <Button size={media ? "small" : "medium"} onClick={handleOpenModal}>
          Nova transação
        </Button>
      </div>
    </header>
  );
};

export default Header;
