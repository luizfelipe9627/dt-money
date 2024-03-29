interface ArrowUpProps {
  size: "small" | "medium";
}

const commonProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "transparent",
};

const smallProps = {
  width: "25",
  height: "24",
  viewBox: "0 0 25 24",
  ...commonProps,
};

const mediumProps = {
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  ...commonProps,
};

const ArrowUp = ({ size }: ArrowUpProps) => {
  return (
    <>
      {size === "small" && (
        <svg {...smallProps} aria-label="Seta para cima">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.75 3.75012C8.19365 3.75012 4.5 7.44377 4.5 12.0001C4.5 16.5565 8.19365 20.2501 12.75 20.2501C17.3063 20.2501 21 16.5565 21 12.0001C21 7.44377 17.3063 3.75012 12.75 3.75012ZM3 12.0001C3 6.61535 7.36522 2.25012 12.75 2.25012C18.1348 2.25012 22.5 6.61535 22.5 12.0001C22.5 17.3849 18.1348 21.7501 12.75 21.7501C7.36522 21.7501 3 17.3849 3 12.0001Z"
            fill="#00B37E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.75 7.50012C12.9489 7.50012 13.1396 7.57914 13.2803 7.71979L16.4584 10.8979C16.7513 11.1908 16.7513 11.6657 16.4584 11.9586C16.1655 12.2515 15.6907 12.2515 15.3978 11.9586L12.75 9.31078L10.1022 11.9586C9.80928 12.2515 9.3344 12.2515 9.04151 11.9586C8.74862 11.6657 8.74862 11.1908 9.04151 10.8979L12.2196 7.71979C12.3603 7.57914 12.5511 7.50012 12.75 7.50012Z"
            fill="#00B37E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.75 7.50012C13.1642 7.50012 13.5 7.83591 13.5 8.25012L13.5 15.7501C13.5 16.1643 13.1642 16.5001 12.75 16.5001C12.3358 16.5001 12 16.1643 12 15.7501L12 8.25012C12 7.83591 12.3358 7.50012 12.75 7.50012Z"
            fill="#00B37E"
          />
        </svg>
      )}
      {size === "medium" && (
        <svg {...mediumProps} aria-label="Seta para cima">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16Z"
            fill="#00B37E"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 10C16.2652 10 16.5195 10.1054 16.7071 10.2929L20.9446 14.5304C21.3351 14.9209 21.3351 15.5541 20.9446 15.9446C20.554 16.3351 19.9209 16.3351 19.5303 15.9446L16 12.4142L12.4696 15.9446C12.079 16.3351 11.4459 16.3351 11.0553 15.9446C10.6648 15.5541 10.6648 14.9209 11.0553 14.5304L15.2928 10.2929C15.4804 10.1054 15.7347 10 16 10Z"
            fill="#00B37E"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 10C16.5523 10 17 10.4477 17 11L17 21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21L15 11C15 10.4477 15.4477 10 16 10Z"
            fill="#00B37E"
          />
        </svg>
      )}
    </>
  );
};

export default ArrowUp;
