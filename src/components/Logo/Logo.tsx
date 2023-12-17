import IgniteLogo from "../../assets/IgniteLogo.svg";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <a href="#" className={styles.logo}>
      <img src={IgniteLogo} alt="Logo Ignite" title="Logo Ignite" />
      <h1>DT Money</h1>
    </a>
  );
};

export default Logo;
