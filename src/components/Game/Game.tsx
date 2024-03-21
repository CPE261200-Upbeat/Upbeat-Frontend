import React, { useEffect, useState } from "react";
import "./Game.css";
import Hex from "./map/1Hex"; 
import { selectGame } from "@/redux/slices/game";
import { useAppSelector } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { Player } from "@/model/player";
import { Config } from "@/model/config";
import Map from "./map/Map";

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
  const [gameMap, setGameMap] = useState<JSX.Element[][]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(player?.timeLeft);
  const [constructionPlan, setConstructionPlan] = useState<string>(
    player?.constructionPlan || ''
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

    const images: JSX.Element[][] = [];
    const initialXPos = 600;  // X Pos เริ่มต้น
    const initialYPos = 80;   // Y Pos เริ่มต้น
    const xPosIncrement = 50; // X Gap ของแต่ละ Col
    const yPosIncrement = 62; // Y Gap ของแต่ละ Row
    const yPosOffset = 30;    // Y Gap ของแต่ละ Col (Even Col , Odd Col)
    
    let xPos = initialXPos;
    let yPos = initialYPos;
    
    for (let i = 0; i < row; i++) {
      const row = [];
      for (let j = 0; j < col; j++) {
        const key = `${i},${j}`
        const yPosRef = j % 2 === 0 ? yPos : yPos - yPosOffset;
        row.push(<Hex key = {key} xPos={xPos} yPos={yPosRef}/>);
        xPos += xPosIncrement;
  
      }
    
      images.push(row);
      xPos = initialXPos;
      yPos += yPosIncrement;
    }

    setGameMap(images)
  },[gameInfo])

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        handlePlayerLose();
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timeLeft]); 

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
      <Map gameMap={gameMap}/> 
      {me === player && (
        <div>
          <textarea
            className="ta10em"
            value={player?.constructionPlan || ''}
            onChange={handlePlan}
            placeholder="Construction Plan"
          />
          <button className="confirm" onClick={handleConfirmPlan} >
            Confirm
          </button>
          {isError === 1 && <div> Error Confirm Plan Please Try again!!! </div>}
        </div>
      )}
      <div className="timeLeft" key = {timeLeft}> {timeLeft} </div>
    </div>
  );
  

};

export default Game;
