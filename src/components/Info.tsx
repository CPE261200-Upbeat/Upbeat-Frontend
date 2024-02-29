import React, { useEffect, useState } from "react";
import { getGameInfo, GameInfoResponse } from "../repositories/index";

const GameInfoComponent: React.FC = () => {
  const [gameInfo, setGameInfo] = useState<GameInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameInfo();
        setGameInfo(data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch game information");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      <pre>{JSON.stringify(gameInfo.map, null, 2)}</pre>
    </div>
  );
};

export default GameInfoComponent;
