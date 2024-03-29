import styles from "./CardValue.module.scss";

interface CardValueProps {
  title: string;
  value: string;
  imgSrc: string;
  bgColor?: string;
  info?: string;
  colorInfo?: string;
}

const CardValue = ({
  title,
  value,
  imgSrc,
  bgColor,
  info,
  colorInfo,
}: CardValueProps) => {
  return (
    <div className={styles.cardValue} style={{ backgroundColor: bgColor }}>
      <div className={styles.title}>
        <p>{title}</p>
        <img src={imgSrc} />
      </div>

      <div className={styles.data}>
        <h1>{value}</h1>
        {info && (
          <p className={styles.subtitle} style={{ color: `${colorInfo}` }}>
            {info}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardValue;
