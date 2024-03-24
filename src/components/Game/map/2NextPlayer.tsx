import React from "react";
import Hex from "./genHex";
import { Player } from "@/model/player";

interface UFOProps {
  Players: Player[];
  turn: number;
}

const PlayerOrder: React.FC<UFOProps> = ({ Players, turn }: UFOProps) => {
  return (
    <div>
      <div>
        {/*alien */}
        <svg
          className="alien"
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 150 150"
          stroke="black"
          strokeWidth={4}
        >
          <path
            fill={`hsl(${Players[turn].color},100%,50%)`}
            d="M102.26 21.7s-1.19-1.83-3.65-2.22c-3.06-.48-6.08.07-7.05 4.51c-.96 4.42-1.45 10.11 3.49 14.08l-7.6 2.13l-6.51-7.89s2.52.96 2.86-.91c.42-2.29.42-4.36.97-7.87c.58-3.67 1.73-7.51 5.25-9.54c1.92-1.11 4.98-1.74 5.99-2.55c.78-.63.99-2.65 1.33-4.84l5.42 4.16l1.7 7.4z"
          />
          <circle cx="107.39" cy="12.02" r="11.93" fill="white" />
            fill= {`hsl(${Players[turn].color},100%,50%)`}
            d="M25.74 21.7s1.19-1.83 3.65-2.22c3.06-.48 6.08.07 7.05 4.51c.96 4.42 1.46 10.11-3.49 14.08l7.6 2.13l6.51-7.89s-2.52.96-2.86-.91c-.42-2.29-.42-4.36-.97-7.87c-.59-3.67-1.73-7.51-5.25-9.54c-1.92-1.11-4.98-1.74-5.99-2.55c-.78-.63-.99-2.65-1.33-4.84l-5.42 4.16l-1.7 7.4z"
          />
          <circle cx="20.61" cy="12.02" r="11.93" fill="white" />
          <path
            fill={`hsl(${Players[turn].color},100%,50%)`}
            d="M107.29 114.08c-.43-2.59.02-5.5.48-7.83c.82-4.19 2.31-8.22 3.78-12.21c.47-1.29.95-2.58 1.4-3.87c1.5-4.32 2.32-8.9 2.32-13.67c0-25.47-16.78-46.11-51.26-46.11S12.75 51.04 12.75 76.5c0 4.45.71 8.74 2.03 12.81c2.48 7.64 6.49 15.25 6.23 23.48c-.15 4.94-2.97 7.47-6.43 10.44c-1.07.92-1.27 2.42.08 3.19c3.1 1.78 8.32-.19 11.33-1.4c2.69-1.08 5.21-2.93 7.31-5.08c1.08-1.1 2.08-2.27 3.07-3.44c.82-.96 2.18-3.42 3.74-2.72c3.4 1.53-.58 7.86-2.3 9.38c-.7.62-1.65 1.18-1.97 2.12c-.36 1.03.37 1.93 1.3 2.3c2.6 1.04 8.28-.72 10.88-2.46c1.86-1.25 3.41-2.85 4.71-4.68c.81-1.14 2.21-4.74 4.02-4.31c3.32.8 1.92 6.03 2.14 8.3c.11 1.16.78 2.32 1.94 2.77c2.52.99 4.74-.79 6.22-2.63c1.65-2.05 2.44-4.32 3.73-6.54c1.03-1.79 2.83-2.16 4.12-.31c1.88 2.69 3.04 5.25 6.03 6.96c2.46 1.4 5.3 2.27 8.14 2.29c1.25 0 6.79-.66 4.92-3.11c-.82-1.06-2.39-1.32-3.46-2.11c-1.76-1.31-2.57-3.48-2.63-5.62c-.08-3.05 2.87-2.27 4.32-.8c2.35 2.38 3.75 5.76 6.78 7.39c3.63 1.95 9.29 2.9 13.29 1.67c1.36-.42 2.92-1.01 3.01-2.65c.09-1.55-1.23-1.92-2.47-2.27c-1.59-.44-2.69-.84-3.91-2.06c-.92-.88-1.42-2.08-1.63-3.33"
          />
          <path
            fill="white"
            d="m72.04 80.73l18.22-8.71s2.54 3.93 1.92 8.56c-.38 2.77-2.22 6-6.35 7.38c-3.72 1.24-6.78.81-8.78-.08c-4.77-2.11-5.01-7.15-5.01-7.15m-16.64 0l-18.22-8.71s-2.54 3.93-1.92 8.56c.38 2.77 2.23 6 6.35 7.38c3.72 1.24 6.78.81 8.78-.08c4.78-2.11 5.01-7.15 5.01-7.15"
          />
          <path
            fill="white"
            d="M74.85 94.95c-.37-1.25-1.66-2.33-2.97-2.38c-1.57-.06-2.57 1.41-3.73 2.22c-1.34.94-3.01 1.61-4.67 1.46c-2.01-.19-3.07-1.54-4.61-2.64c-1.4-.99-3.15-1-4.39.3c-.59.62-.91 1.47-.86 2.33c.06 1.13.81 2.28 1.61 3.03c3.14 2.97 8.02 3.62 12.08 2.58c2.83-.73 8.73-2.93 7.54-6.9"
          />
        </svg>
        {/*ufo */}
        <svg
          className="ufo"
          xmlns="http://www.w3.org/2000/svg"
          width="80px"
          height="80px"
          viewBox="0 0 23 24 "
          stroke="black"
          strokeWidth={0.5}
        >
          <path
            fill={`hsl(${Players[turn].color},100%,50%)`}
            fillRule="evenodd"
            d="M5.675 8.593C3.432 9.36 2 10.523 2 11.826c0 1.208 1.23 2.296 3.195 3.058l-1.338 2.23a.75.75 0 0 0 1.286.772l1.5-2.5a.724.724 0 0 0 .017-.03c1.347.355 2.91.58 4.59.632V19a.75.75 0 0 0 1.5 0v-3.012c1.68-.052 3.243-.277 4.59-.632a.76.76 0 0 0 .017.03l1.5 2.5a.75.75 0 1 0 1.286-.772l-1.338-2.23C20.77 14.122 22 13.034 22 11.826c0-1.303-1.432-2.467-3.675-3.233c-.124.29-.331.584-.668.819C16.869 9.96 15.3 10.5 12 10.5s-4.868-.54-5.657-1.088a1.893 1.893 0 0 1-.668-.819M13 13a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2m11-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
            clipRule="evenodd"
          ></path>
          <path
            fill={`hsl(${Players[turn].color},100%,50%)`}
            d="M7.055 8.005A4.73 4.73 0 0 1 11.729 4h.542a4.73 4.73 0 0 1 4.674 4.005a.429.429 0 0 1-.145.175c-.414.288-1.61.82-4.8.82c-3.19 0-4.386-.532-4.8-.82a.429.429 0 0 1-.145-.175"
          ></path>
        </svg>
        {/*circle */}
        <svg
          className="circle"
          xmlns="http://www.w3.org/2000/svg"
          width="150px"
          height="150px"
          viewBox="0 0 21 21"
        >
          <circle
            cx="10.5"
            cy="10.5"
            r="8"
            fill={`hsl(${Player.color},100%,80%)`}
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default PlayerOrder;
