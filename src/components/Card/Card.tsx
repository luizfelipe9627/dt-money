import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  value: string;
  imgSrc: string;
  bgColor?: string;
}

const Card = ({ title, value, imgSrc, bgColor }: CardProps) => {
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <div>
        <p className="text-md">{title}</p>
        <img src={imgSrc} />
      </div>

      <h1 className="headline-lg">{value}</h1>
    </div>
  );
};

export default Card;
