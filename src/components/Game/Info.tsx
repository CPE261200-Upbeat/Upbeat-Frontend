import React, { useEffect, useState } from "react";
import "./Game.css";
import { selectGame } from "../../redux/slices/game";
import { useAppSelector } from "../../redux/hook";
import { GameInfo } from "model/game";
const GameInfoComponent: React.FC = () => {
  const gameInfo: GameInfo = useAppSelector(selectGame);

  // if (!gameInfo) {
  //   return <div>No game information available</div>;
  // }

  return (
    <div>
      <h1>Game Information</h1>
      {/* <h2>Config:</h2> */}
      <pre>{JSON.stringify(gameInfo, null, 2)}</pre>
      {/* <h2>Players:</h2>
      <pre>{JSON.stringify(gameInfo.players, null, 2)}</pre>
      <h2>Map:</h2>
      <pre>{JSON.stringify(gameInfo.gameMap, null, 2)}</pre> */}
    </div>
  );
};

export default GameInfoComponent;
