import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { useModal } from "../../context/ModalContext";

const Header = () => {
  const { setModal } = useModal();

  const handleOpenModal = () => {
    setModal(true);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <>
      <header className={`${styles.header}`}>
        <div className={`${styles.wrapper} container`}>
          <Logo />

          <Button size="medium" onClick={handleOpenModal}>
            Nova transação
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
