interface ArrowNextProps {
  disabled: boolean;
}

const ArrowNext = ({ disabled }: ArrowNextProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Seta para voltar"
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.2045 3.7045C8.64384 3.26517 9.35616 3.26517 9.7955 3.7045L17.2955 11.2045C17.7348 11.6438 17.7348 12.3562 17.2955 12.7955L9.7955 20.2955C9.35616 20.7348 8.64384 20.7348 8.2045 20.2955C7.76517 19.8562 7.76517 19.1438 8.2045 18.7045L14.909 12L8.2045 5.2955C7.76517 4.85616 7.76517 4.14384 8.2045 3.7045Z"
          fill={disabled ? "#323238" : "#00875F"}
        />
      </g>
    </svg>
  );
};

export default ArrowNext;
