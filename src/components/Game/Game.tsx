import React, { useEffect, useState } from "react";
import "./Game.css";
import Hex from "./map/1Hex"; // Import the App component
import { selectGame } from "@/redux/slices/game";
import { useAppSelector } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { Player } from "@/model/player";

const Game: React.FC = () => {
  //Common
  const navigate = useNavigate();
  const webSocket = useWebSocket();
  //Client
  const acct: Credential = JSON.parse(localStorage.getItem("acct")!);
  //GameInfo
  const gameInfo :GameInfo = useAppSelector(selectGame);
  const isOver : number = gameInfo.gameState.isOver
  const isError : number = gameInfo.gameState.isError
  const turn :number = gameInfo.players.turn;
  const players : Player[] = gameInfo.players.list;
  const me : Player = players.find(
    (p) => JSON.stringify(p.acct) === JSON.stringify(acct)
  )!;
  const player : Player = players[turn];
  const isMyTurn : boolean = JSON.stringify(me) === JSON.stringify(player)
  //State
  const [timeLeft, setTimeLeft] = useState(player?.timeLeft);
  const [constructionPlan, setConstructionPlan] = useState(
    player.constructionPlan
  );

  if(isOver){
    if(isMyTurn){
      navigate("/win")
    }
    else{
      navigate("/lose")
    }
  }

  //useEffect 
  useEffect(()=>{
    setTimeLeft(player?.timeLeft)
  },[gameInfo])

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        handlePlayerLose();
      }
      setTimeLeft(timeLeft - 1); // Using functional update to ensure state is updated correctly
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
      row.push(<Hex yPos={yPosition} xPos={xPosition} />);
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


  const handlePlayerLose = () => {
    webSocket.executeTurn(constructionPlan,timeLeft);
  };

  const handlePlan = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setConstructionPlan(event.target.value);
    console.log("Plan value:", event.target.value);
  };

  const handleConfirmPlan = () => {
    webSocket.executeTurn(constructionPlan, timeLeft);
  };

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
            onChange={handlePlan}
            placeholder="Construction Plan"
          />
          <button className="confirm" onClick={handleConfirmPlan} >
            Confirm
          </button>
          {isError && <div> Error Confirm Plan Please Try again!!! </div>}
        </div>
      )}
      <div className="timeLeft">{timeLeft}</div>
    </div>
  );
};

export default Game;
