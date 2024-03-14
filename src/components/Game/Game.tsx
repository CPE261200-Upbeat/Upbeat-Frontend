import React, { useEffect, useState } from "react";
import "./Game.css";
import Hex from "./map/1Hex"; // Import the App component
import hexClear from "../../assets/material/hex/hex-clear.png";
import { selectGame } from "../../redux/slices/game";
import { useAppSelector } from "../../redux/hook";
import { Credential } from "model/credential";
import { useNavigate } from "react-router-dom";
import useWebSocket from "../../websocket/useWebsocket";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const webSocket = useWebSocket();

  const gameInfo = useAppSelector(selectGame);
  const acct: Credential = JSON.parse(localStorage.getItem("acct")!);
  // const username = acct.username;
  const turn = gameInfo.players.turn;
  const players = gameInfo.players.list;
  const me = players.find(
    (p) => JSON.stringify(p.acct) === JSON.stringify(acct)
  );
  const player = players[turn];

  const [timeLeft, setTimeLeft] = useState(player.timeLeft);
  const [constructionPlan, setConstructionPlan] = useState(
    player.constructionPlan
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        playerLose();
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

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
    navigate("/lose");
  };

  // Function to handle textarea change and update state
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setConstructionPlan(event.target.value);
    console.log("Textarea value:", event.target.value);
  };

  // //send data to confimedplan => send to back end
  const handleConfirmPlan = () => {
    webSocket.executeTurn(constructionPlan, timeLeft);
  };

  if (!gameInfo) return <div>Loading...</div>;

  return (
    <div>
      {images.map((row, rowIndex) => (
        <div key={rowIndex}>{row}</div>
      ))}
      {me === player && (
        <div>
          <textarea
            className="ta10em"
            value={player.constructionPlan}
            onChange={handleTextareaChange}
            placeholder="Construction Plan"
          />
          <button className="confirm" onClick={handleConfirmPlan}>
            Confirm
          </button>
        </div>
      )}
      <div className="timeLeft">{timeLeft}</div>
    </div>
  );
};
export default Game;
