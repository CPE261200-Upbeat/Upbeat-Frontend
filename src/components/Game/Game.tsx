import React, { useEffect, useState } from "react";
import "./Game.css";
import Hex from "./map/1Hex"; // Import the App component
import { selectGame } from "@/redux/slices/game";
import { useAppSelector } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { Player } from "@/model/player";
import { Config } from "@/model/config";

const Game: React.FC = () => {
  //Common
  const navigate = useNavigate();
  const webSocket = useWebSocket();
  //Client
  const acct: Credential = JSON.parse(localStorage.getItem("acct")!);
  //GameInfo
  const gameInfo :GameInfo = useAppSelector(selectGame);
  const config : Config  = gameInfo.config
  const row : number = config.m;
  const col : number = config.n;
  //GameState
  const isOver : number = gameInfo.gameState.isOver
  const isError : number = gameInfo.gameState.isError
  const turn :number = gameInfo.players.turn;
  //Players
  const players : Player[] = gameInfo.players.list;
  const me : Player = players.find(
    (p) => JSON.stringify(p.acct) === JSON.stringify(acct)
  )!;
  const player : Player = players[turn];
  const isMyTurn : boolean = JSON.stringify(me) === JSON.stringify(player)
  //State
  const [timeLeft, setTimeLeft] = useState(player?.timeLeft);
  const [constructionPlan, setConstructionPlan] = useState(
    player?.constructionPlan
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

  let xPos = 600;
  let yPosEven = 80;
  let yPosOdd = 50;

  for (let i = 0; i < row; i++) {
    const row = [];
    for (let j = 0; j < col; j++) {
      if(j % 2 === 0) {
        row.push(<Hex xPos={xPos} yPos={yPosEven}/>)

      }else{
        row.push(<Hex xPos={xPos} yPos={yPosOdd}/>)
      }
      xPos += 50;
    }

    images.push(row);
    xPos = 600;
    yPosEven += 62;
    yPosOdd += 62 ;
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
