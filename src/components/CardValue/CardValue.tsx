import useMedia from "../../hooks/useMedia";
import styles from "./CardValue.module.scss";

// Criado uma interface chamada CardValueProps.
interface CardValueProps {
  // O operador "?" significa que a propriedade é opcional.
  title: string;
  value: string;
  imgSrc: string;
  bgColor?: string;
  info?: string;
  colorInfo?: string;
}

// Criado um componente chamado CardValue que recebe as propriedades do tipo CardValueProps, sendo elas title, value, imgSrc, bgColor, info e colorInfo.
const CardValue = ({
  title,
  value,
  imgSrc,
  bgColor,
  info,
  colorInfo,
}: CardValueProps) => {
  const media = useMedia("(max-width: 990px)"); // Está criando uma variável chamada media que recebe o custom hook useMedia que recebe como parâmetro a media query (max-width: 990px), sendo assim, se a tela for menor que 990px, então media será true, caso contrário, será false.

  return (
    // O cardValue recebe o valor da propriedade bgColor como background.
    <div className={styles.cardValue} style={{ backgroundColor: bgColor }}>
      <div className={styles.title}>
        <p className="text-md">{title}</p>
        <img src={imgSrc} />
      </div>

      <div className={styles.data}>
        {/* Se a media for verdadeira, então retorna o h1 com a classe headline-md, caso contrário, retorna o h1 com a classe headline-lg. */}
        <h1 className={media ? "headline-md" : "headline-lg"}>{value}</h1>
        {info && (
          <p
            className={`${styles.subtitle} text-sm`}
            // O style recebe o valor da propriedade colorInfo como color.
            style={{ color: `${colorInfo}` }}
          >
            {info}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardValue;
