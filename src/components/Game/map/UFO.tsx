import React from "react";
import Hex from "./genHex";

interface UFOProps {
  fillColor: string;
}

const UFO: React.FC<UFOProps> = ({ fillColor }: UFOProps) => {
  const arrHsl: string[] = fillColor.match(/\d+/g)!;
  const ufoColor: string = `hsl(${arrHsl[0]},100%,50%)`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40px"
      height="40px"
      viewBox="0 0 23 24 "
      stroke="black"
      strokeWidth={0.5}
    >
      <path
        fill={ufoColor}
        fillRule="evenodd"
        d="M5.675 8.593C3.432 9.36 2 10.523 2 11.826c0 1.208 1.23 2.296 3.195 3.058l-1.338 2.23a.75.75 0 0 0 1.286.772l1.5-2.5a.724.724 0 0 0 .017-.03c1.347.355 2.91.58 4.59.632V19a.75.75 0 0 0 1.5 0v-3.012c1.68-.052 3.243-.277 4.59-.632a.76.76 0 0 0 .017.03l1.5 2.5a.75.75 0 1 0 1.286-.772l-1.338-2.23C20.77 14.122 22 13.034 22 11.826c0-1.303-1.432-2.467-3.675-3.233c-.124.29-.331.584-.668.819C16.869 9.96 15.3 10.5 12 10.5s-4.868-.54-5.657-1.088a1.893 1.893 0 0 1-.668-.819M13 13a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2m11-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
        clipRule="evenodd"
      ></path>
      <path
        fill={ufoColor}
        d="M7.055 8.005A4.73 4.73 0 0 1 11.729 4h.542a4.73 4.73 0 0 1 4.674 4.005a.429.429 0 0 1-.145.175c-.414.288-1.61.82-4.8.82c-3.19 0-4.386-.532-4.8-.82a.429.429 0 0 1-.145-.175"
      ></path>
    </svg>
  );
};

export default UFO;
