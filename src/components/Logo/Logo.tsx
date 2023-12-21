import styles from "./Logo.module.scss";
import IgniteImg from "../../assets/Ignite.svg";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={IgniteImg} alt="Ignite Logo" title="Ignite Logo" />
      <h1>DT Money</h1>
    </div>
  );
};

export default Logo;
