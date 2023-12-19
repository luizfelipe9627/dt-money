import styles from "./CardValue.module.scss";

interface CardValueProps {
  title: string;
  value: string;
  imgSrc: string;
  bgColor?: string;
}

const CardValue = ({ title, value, imgSrc, bgColor }: CardValueProps) => {
  return (
    <div className={styles.cardValue} style={{ backgroundColor: bgColor }}>
      <div>
        <p className="text-md">{title}</p>
        <img src={imgSrc} />
      </div>

      <h1 className="headline-lg">{value}</h1>
    </div>
  );
};

export default CardValue;
