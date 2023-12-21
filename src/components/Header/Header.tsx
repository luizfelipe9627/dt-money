import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { useModal } from "../../context/ModalContext";
import useMedia from "../../hooks/useMedia";

const Header = () => {
  const { setModal } = useModal();
  const media = useMedia("(max-width: 500px)");

  const handleOpenModal = () => {
    setModal(true);
    window.scrollTo({ behavior: "smooth", top: 0 });
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
