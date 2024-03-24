import React, { useEffect, useState } from "react";
import "./Init.css";
import { useMutationSetPlan } from "@/query/game";
import { useAppSelector } from "@/redux/hook";
import { selectPlayer } from "@/redux/slices/player";
import { selectGame } from "@/redux/slices/game";
import useWebSocket from "@/websocket/useWebsocket";
import { useNavigate } from "react-router-dom";

function Init() {
  const navigate = useNavigate();
  const webSocket = useWebSocket();

  const gameInfo = useAppSelector(selectGame);
  console.log(gameInfo);
  const gameState = gameInfo.gameState;
  const readyCount = gameState.readyCount;

  const players = gameInfo.players.list;
  const player = useAppSelector(selectPlayer);
  const mutationSetPlan = useMutationSetPlan();
  const [constructionPlan, setConstructionPlan] = useState<string>(
    player?.constructionPlan
  );
  const [disable, setDisable] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const handlePlan = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConstructionPlan(event.target.value);
    console.log("Plan value:", event.target.value);
  };

  useEffect(() => {
    if (readyCount === players.length) navigate("/game");
  }, [gameState.readyCount]);
  const handleConfirmPlan = async () => {
    const updatedPlayer = { ...player };
    updatedPlayer.constructionPlan = constructionPlan;
    const response = await mutationSetPlan.mutateAsync(updatedPlayer);
    if (response) setDisable(true);
    else setIsError(true);
    webSocket.getData();
  };

  return (
    <div>
      <textarea
        className="ta10em"
        value={constructionPlan}
        onChange={handlePlan}
        placeholder="Construction Plan"
        name="Init your plan"
      />
      <button
        className="confirm"
        onClick={handleConfirmPlan}
        disabled={disable}
      >
        Ready
      </button>
      {isError && <div> Error!!! </div>}
    </div>
  );
}

export default Init;
