import styles from "./Logo.module.scss";
import Ignite from "../../assets/Ignite.svg";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={Ignite} alt="Ignite Logo" title="Ignite Logo" />
      <h1>DT Money</h1>
    </div>
  );
};

export default Logo;
