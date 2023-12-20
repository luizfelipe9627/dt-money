interface ArrowPrevProps {
  disabled: boolean;
}

const ArrowPrev = ({ disabled }: ArrowPrevProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.7955 3.7045C16.2348 4.14384 16.2348 4.85616 15.7955 5.2955L9.09099 12L15.7955 18.7045C16.2348 19.1438 16.2348 19.8562 15.7955 20.2955C15.3562 20.7348 14.6438 20.7348 14.2045 20.2955L6.7045 12.7955C6.26517 12.3562 6.26517 11.6438 6.7045 11.2045L14.2045 3.7045C14.6438 3.26517 15.3562 3.26517 15.7955 3.7045Z"
          fill={disabled ? "#323238" : "#00875F"}
        />
      </g>
    </svg>
  );
};

export default ArrowPrev;
