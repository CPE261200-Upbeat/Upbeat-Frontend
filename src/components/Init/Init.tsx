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
    if (response) {
      setDisable(true)
      setIsError(false)
    }
    else setIsError(true);
    webSocket.getData();
  };

  return (
    <section>
      <div className="wrapper_init">
        <div className="bg_container">
          <div className="init_container">
            <textarea
              className="init_box"
              value={constructionPlan}
              onChange={handlePlan}
              placeholder="Construction Plan"
            ></textarea>
            {isError && <div className="Error"> Error!!! </div>}
            <div>
              <button
                type="submit"
                onClick={handleConfirmPlan}
                disabled={disable}
              >
                Ready
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Init;
