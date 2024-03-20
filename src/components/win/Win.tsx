import "./Win.css";
import { GameState } from "@/model/gameState";
import useWebSocket from "@/websocket/useWebsocket";


function Win() {

  const websocket = useWebSocket();
  const gameState: GameState = {
    isOver: 0,
    isBegin: 0,
    isPaused: 0,
    isError : 0,
    turnCount: 1,
  };
  
  websocket.handleSetState(gameState);
  return (
    <section>
      <div className="wapper">
        <div className="game">
          <img src="/src/assets/material/Game_over.gif" />
        </div>
        <div className="container">
          <img className="trophy" src="/src/assets/material/trophy.gif" />
          <div className="win">YOU WIN</div>
          <img className="star" src="/src/assets/material/star.gif" />
        </div>
        <button type="submit">EXIT</button>
      </div>
    </section>
  );
}

export default Win;
