import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { useModal } from "../../context/ModalContext";

const Header = () => {
  const { setModal } = useModal();

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
    </>
  );
};

export default Header;
