import React, { useEffect, useState } from "react";
import "./Game.css";
import Hex from "./map/genHex";
import { selectGame } from "@/redux/slices/game";
import { useAppSelector } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { Player } from "@/model/player";
import { Config } from "@/model/config";
import Map from "./map/Map";
import Timer from "./map/Timer";
import { Region } from "@/model/region";
import { selectPlayer } from "@/redux/slices/player";
import { Account } from "@/model/account";
// import NextPlayer from "./map/2NextPlayer";
import {
  INIT_X_POS,
  INIT_Y_POS,
  RESET_STATE,
  X_POS_INCREMENT,
  Y_POS_INCREMENT,
  Y_POS_OFFSET,
} from "./config/constant";
import Circle from "./map/CirclePic";
//
const Game: React.FC = () => {
  //Common
  const navigate = useNavigate();
  const webSocket = useWebSocket();
  //Client
  const client: Player = useAppSelector(selectPlayer);
  const acct: Account = client.acct;
  //GameInfo
  const gameInfo: GameInfo = useAppSelector(selectGame);
  console.log(gameInfo);
  const map: Region[][] = gameInfo.gameMap.regions;
  const config: Config = gameInfo.config;
  const row: number = config.m;
  const col: number = config.n;
  //GameState
  const isBegin: number = gameInfo.gameState.isBegin;
  const isOver: number = gameInfo.gameState.isOver;
  const isError: number = gameInfo.gameState.isError;
  const turn: number = gameInfo.players.turn;
  //Players
  const players: Player[] = gameInfo.players.list;
  const player: Player = players[turn];
  const me: Player | undefined = players.find(
    (player) => JSON.stringify(player.acct) === JSON.stringify(acct)
  );
  const isMyTurn: boolean =
    JSON.stringify(player.acct) === JSON.stringify(acct);
  //State
  const [gameMap, setGameMap] = useState<JSX.Element[][]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(player?.timeLeft);
  const [popUpClicked, isPopUpClicked] = useState(false);
  const [constructionPlan, setConstructionPlan] = useState<string>(
    player?.constructionPlan
  );
  //constant
  const defaultColor: string = "hsl(0,0%,50%)";

  //useEffect
  useEffect(() => {
    if (isOver) {
      webSocket.handleSetState(RESET_STATE);
    }
  }, [isOver]);

  useEffect(() => {
    if (!isBegin) {
      if (isMyTurn) {
        navigate("/win");
      } else if (me) {
        navigate("/lose");
      } else {
        navigate("/lobby");
      }
    }

    setTimeLeft(player?.timeLeft);
    setConstructionPlan(player?.constructionPlan);

    const images: JSX.Element[][] = [];
    let xPos = INIT_X_POS;
    let yPos = INIT_Y_POS;

    for (let i = 0; i < row; i++) {
      const row = [];
      for (let j = 0; j < col; j++) {
        const key = `${i},${j}`;
        const region: Region = map[i][j];
        const owner: Player | null = region.owner; //who own this?
        const isCityCenter: number = region.isCityCenter; //is citycenter?

        //search crew
        const crew: Player | null = region.standOn;
        let crewColor = null;
        if (crew) {
          crewColor = `hsl(${crew.color},100%,80%)`;
        }

        let hslColor: string = defaultColor;
        if (owner) {
          hslColor = `hsl(${owner.color}, 100%, 80%)`;
        }
        const yPosRef = j % 2 === 0 ? yPos : yPos - Y_POS_OFFSET;
        row.push(
          <Hex
            key={key}
            xPos={xPos}
            yPos={yPosRef}
            hslColor={hslColor}
            isCityCenter={isCityCenter}
            crewColor={crewColor}
            region={region}
          />
        );
        xPos += X_POS_INCREMENT;
      }

      images.push(row);
      xPos = INIT_X_POS;
      yPos += Y_POS_INCREMENT;
    }

    setGameMap(images);
  }, [gameInfo]);

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
    webSocket.executeTurn(constructionPlan, timeLeft);
  };

  const handlePlan = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConstructionPlan(event.target.value);
    console.log("Plan value:", event.target.value);
  };

  const handleConfirmPlan = () => {
    webSocket.executeTurn(constructionPlan, timeLeft);
    //isPopUpClicked(!popUpClicked);
  };
  useEffect(() => {
    if (isError === 1) {
      isPopUpClicked(false);
    }
  }, [isError]);

  const handlePopUp = () => {
    isPopUpClicked(!popUpClicked);
  };

  return (
    <div>
      <Map gameMap={gameMap} />

      {isMyTurn && !popUpClicked && (
        <button className="popUp" onClick={handlePopUp}>
          ...
        </button>
      )}

      {isMyTurn && popUpClicked && (
        <div>
          <textarea
            className="ta10em"
            value={constructionPlan}
            onChange={handlePlan}
            placeholder="Construction Plan"
          />
          <button className="confirm" onClick={handleConfirmPlan}>
            Confirm
          </button>
          {isError === 1 && <h2> Error Confirm Plan Please Try again!!! </h2>}
        </div>
      )}

      <div>{me && <Circle Player={me} />}</div>
      {/* <NextPlayer Players={players} turn={turn} /> */}
      <Timer timeLeft={timeLeft} />
    </div>
  );
};

export default Game;
