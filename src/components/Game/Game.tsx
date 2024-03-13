import React, { useEffect, useState } from "react";
import "./Game.css";
import Hex from "./map/1Hex"; // Import the App component
import hexClear from "../../assets/material/hex/hex-clear.png";
import { selectPlayer } from "../../redux/slices/player";
import { selectGame } from "../../redux/slices/game";
import { useQueryGameData } from "../../query/game";
import { useAppSelector } from "../../redux/hook";

const Game: React.FC = () => {
  const useQueryGame = useQueryGameData();
  const gameInfo = useAppSelector(selectGame);
  const player = useAppSelector(selectPlayer);
  const [constructionPlan, setConstructionPlan] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const turn = gameInfo.players.turn;
    const currentPlayer = gameInfo?.players?.list[turn];
    if (currentPlayer) {
      setConstructionPlan(currentPlayer.constructionPlan);
      setTimeLeft(currentPlayer.timeLeft);
    }
  }, [gameInfo]);

  const images = [];
  let xPosition = 350;
  let yPosition = 50;
  const nRow = 15;
  const nColumn = 10;
  for (let i = 0; i < nRow; i++) {
    const row = [];

    for (let j = 0; j < nColumn; j++) {
      const key = `${i},${j}`;
      const imageUrl = hexClear; //change for game methods
      row.push(
        <Hex yPos={yPosition} xPos={xPosition} key={key} imageUrl={imageUrl} />
      );
      yPosition += 62;
    }
    images.push(row);
    if (i % 2 === 0) {
      yPosition = 81;
      xPosition += 48;
    } else {
      yPosition = 50;
      xPosition += 48;
    }
  }

  const playerLose = () => {
    window.location.href = "/lose";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        playerLose();
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Function to handle textarea change and update state
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setConstructionPlan(event.target.value);
    console.log("Textarea value:", event.target.value);
  };

  // //send data to confimedplan => send to back end
  // const handleConfirmPlan = () => {
  //   currentPlayer.constructionPlan = constructionPlan;
  //   currentPlayer.timeLeft = timeLeft;

  //   webSocket.executeTurn(player);
  //   // setConfirmedPlan(constructionPlan);
  //   // console.log("Confirmed:", );
  // };

  if (useQueryGame.isLoading || !gameInfo) return <div>Loading...</div>;

  return (
    <div>
      {images.map((row, rowIndex) => (
        <div key={rowIndex}>{row}</div>
      ))}

      <div>
        <textarea
          className="ta10em"
          value={constructionPlan}
          onChange={handleTextareaChange}
          placeholder="Construction Plan"
        />
      </div>
      <div className="timeLeft">{timeLeft}</div>

      {/* <button className="confirm" onClick={handleConfirmPlan}> */}
      {/* confirm
      </button> */}
    </div>
  );
};

export default Game;
