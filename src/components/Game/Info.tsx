import React from "react";
import { GameInfo } from "../../model/game";
import { Player } from "../../model/player";
import { useAppSelector } from "../../redux/hook";
import { selectGame } from "../../redux/slices/game";
import useWebSocket from "../../websocket/useWebsocket";

const GameInfoComponent: React.FC = () => {
  // const { executeTurn} = useWebSocket()
  // const player:Player = {
  //   acct: { username: 'username', password: '' }, 
  //   budget: 0,
  //   cityCenter: { 
  //       isCityCenter: false,
  //       deposit : 0,
  //       pos: {
  //           row: 0 ,
  //           col: 0 ,
  //       },
  //       owner : null,
  //   },
  //   crew: {
  //       pos : {
  //           row: 0 ,
  //           col: 0 ,
  //       },
  //   },
  //   timeLeft: 0,
  //   constructionPlan: 'move up',
  //   defeat: false
  // }
  // executeTurn(player)

  const gameInfo: GameInfo = useAppSelector(selectGame);

  if (!gameInfo) {
    return <div>No game information available</div>;
  }

  return (
    <div>
      <h1>Game Information</h1>
      <h2>Config:</h2>
      <pre>{JSON.stringify(gameInfo.config, null, 2)}</pre>
      <h2>Players:</h2>
      <pre>{JSON.stringify(gameInfo.players, null, 2)}</pre>
      <h2>Map:</h2>
      <pre>{JSON.stringify(gameInfo.gameMap, null, 2)}</pre>
    </div>
  );
};

export default GameInfoComponent;
