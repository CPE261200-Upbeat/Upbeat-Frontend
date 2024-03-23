import "./Win.css";
import { GameState } from "@/model/gameState";
import { useAppSelector } from "@/redux/hook";
import { selectGame } from "@/redux/slices/game";
import useWebSocket from "@/websocket/useWebsocket";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Win() {
  const websocket = useWebSocket();
  const gameInfo = useAppSelector(selectGame);
  const navigate = useNavigate();

  const handleGoToLobby = () => {
    const gameState: GameState = {
      isOver: 0,
      isBegin: 0,
      isPaused: 0,
      isError: 0,
      turnCount: 1,
    };
    websocket.handleSetState(gameState);
  };

  useEffect(() => {
    if (!gameInfo.gameState?.isBegin) {
      navigate("/lobby");
    }
  }, [gameInfo]);

  return (
    <section>
      <div className="wapper_Win">
        <div className="game">
          <img src="/src/assets/material/Game_over.gif" />
        </div>
        <div className="container">
          <img className="trophy" src="/src/assets/material/trophy.gif" />
          <div className="win">YOU WIN</div>
          <img className="star" src="/src/assets/material/star.gif" />
        </div>
        <div className="btn">
          <button type="button" onClick={() => handleGoToLobby()}>
            LOBBY
          </button>
          <button type="button">EXIT</button>
        </div>
      </div>
    </section>
  );
}

export default Win;
