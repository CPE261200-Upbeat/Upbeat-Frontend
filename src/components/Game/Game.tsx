import React, { useEffect, useState } from "react";
import "./Game.css";
import Hex from "./map/genHex";
import { selectGame } from "@/redux/slices/game";
import {  useAppSelector } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import { GameInfo } from "@/model/game";
import { Player } from "@/model/player";
import { Config } from "@/model/config";
import { FaUserCircle } from "react-icons/fa";
import Map from "./map/Map";
import { Region } from "@/model/region";
import { selectPlayer } from "@/redux/slices/player";
import { Account } from "@/model/account";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  INIT_X_POS,
  INIT_Y_POS,
  RESET_STATE,
  X_POS_INCREMENT,
  Y_POS_INCREMENT,
  Y_POS_OFFSET,
} from "../../config/constant";
import Circle from "./map/CirclePic";
import { LobbyInfo } from "@/model/lobbyInfo";
import { selectLobby } from "@/redux/slices/lobby";
import Timer from "./map/Timer";
import useWebSocket from "@/websocket/useWebsocket";
import { GameState } from "@/model/gameState";
const Game: React.FC = () => {
  //Common
  const navigate = useNavigate();
  const webSocket = useWebSocket();
  //Client
  const client: Player = useAppSelector(selectPlayer);
  const acct: Account = client.acct;
  //GameInfo
  const gameInfo: GameInfo = useAppSelector(selectGame);
  const gameState :GameState = gameInfo.gameState
  const lobbyInfo: LobbyInfo = useAppSelector(selectLobby);
  const map: Region[][] = gameInfo.gameMap.regions;
  const config: Config = gameInfo.config;
  const row: number = config.m;
  const col: number = config.n;
  //GameState
  const isJoined: boolean = lobbyInfo.isJoined;
  const isPaused: number = gameState.isPaused;
  const isBegin: number = gameState.isBegin;
  const isOver: number = gameState.isOver;
  const isError: number = gameState.isError;
  const turn: number = gameInfo.players.turn;
  //Players
  const players: Player[] = gameInfo.players.list;
  const currentPlayer: Player = players[turn];
  const me: Player | undefined = players.find(
    (player) => JSON.stringify(player.acct) === JSON.stringify(acct)
  );
  const isMyTurn: boolean =
    me !== undefined &&
    JSON.stringify(currentPlayer.acct) === JSON.stringify(acct);
  //State
  const [gameMap, setGameMap] = useState<JSX.Element[][]>([]);
  const [executeSec, setExecuteSec] = useState(2);
  const [planRevTime, setPlanRevTime] = useState(currentPlayer?.planRevTime);
  const [isPopUpClicked, setIsPopUpClicked] = useState(false);
  const [constructionPlan, setConstructionPlan] = useState<string>(
    (me && me.constructionPlan) || ""
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
      } else if (isJoined) {
        navigate("/lose");
      } else {
        navigate("/lobby");
      }
    }
  }, [isBegin]);

  useEffect(() => {
    const exePlanInterval: NodeJS.Timeout = setInterval(() => {

      if (executeSec === 0 ) {
        if(isMyTurn) handleForceExecuteTurn();
        setExecuteSec(2)
      }
      if(executeSec > 0 && !isPaused) setExecuteSec(executeSec - 1);
    }, 1000);

    return () => {clearInterval(exePlanInterval)};
  }, [executeSec , isPaused]);


  useEffect(() => {
    const planRevTimeInterval: NodeJS.Timeout = setInterval(() => {
      if (planRevTime === 0 && isMyTurn) {
        handleForceExecuteTurn();
      }
      if(planRevTime > 0 && isPaused) setPlanRevTime(planRevTime - 1);
    }, 1000);

    return () => clearInterval(planRevTimeInterval);
  }, [planRevTime , isPaused]);
  
  useEffect(()=>{
    setPlanRevTime(currentPlayer?.planRevTime);
  },[currentPlayer])

  useEffect(() => {
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
        const crews: Player[] = region.standOn!;
        let crewColor = null;
        if (crews && crews.length >= 1) {
          crewColor = `hsl(${crews[crews.length - 1].color},100%,80%)`;
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
  }, [map]);

  const handlePlan = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConstructionPlan(event.target.value);
  };

  const handleForceExecuteTurn = () => {
    webSocket.executeTurn();
  };

  const handlePopUp = () => {
    const state:GameState = {
      ...gameState,
      isPaused : 1,
    }
    setIsPopUpClicked(true);
    webSocket.handleSetState(state)
  };

  const handleConfirmPlan = async () => {
    webSocket.handleSetPlan(constructionPlan , planRevTime)
  };

  useEffect(() => {
    if (isError === 1) {
      setIsPopUpClicked(true);
      setConstructionPlan((me && me.constructionPlan) || "");
    }else{
      setIsPopUpClicked(false);
    }
  }, [isError]);
  console.log(planRevTime)
  return (
    <div>
      <div className="border_clock">
        <div className="clock">
          <Timer timeLeft={executeSec} />
        </div>
      </div>

      <Map gameMap={gameMap} />

      {isMyTurn && !isPopUpClicked && (
        <GiHamburgerMenu className="popUp" onClick={handlePopUp} />
      )}

      {isMyTurn && isPopUpClicked && (
        <div className="box_textarea">
          <ImCross className="Cross" onClick={handleConfirmPlan} />
          <textarea
            className="textarea"
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

      <div className="display">
        <div className="map">
          <Map gameMap={gameMap} />
        </div>
        <div className="all">
          {players.map((player) => (
            <div key={player.acct.username} className="wrapper_userShow">
              <div className="show_user">
                <div className="user_player">{player.acct.username}</div>
                <div className="time_show">
                  <p>Time = </p>
                  {
                    <Timer
                      timeLeft={
                        JSON.stringify(player.acct) === JSON.stringify(currentPlayer.acct)
                          ? planRevTime
                          : player.planRevTime
                      }
                    />
                  }
                </div>
                <div className="budget">
                  <p> Budget =</p>
                  {Math.trunc(player.budget)}
                </div>
              </div>
              <div className="bg_icon">
                <FaUserCircle
                  className="user_icon"
                  color={`hsl(${player.color}, 100%, 50%)`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
