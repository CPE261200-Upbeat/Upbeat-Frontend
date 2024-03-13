import "../lobby/Lobby.css";
import useWebSocket from "../../websocket/useWebsocket";
import { useAppSelector } from "../../redux/hook";
import { GameState } from "../../model/gameState";
import { selectGame } from "../../redux/slices/game";
import { useEffect } from "react";
import { selectCredential } from "../../redux/slices/credential";

function Lobby() {
  const websocket = useWebSocket();
  const credential = useAppSelector(selectCredential)

  useEffect(() => {
    websocket.connect();
  }, []);

  const gameInfo = useAppSelector(selectGame);

  const handleClick = (buttonType: string) => { 
    if (buttonType === "join") {
      websocket.handleJoin(credential);
    } else if (buttonType === "start") {
      const gameState: GameState = {
        isOver: false,
        isBegin: true,
        isPaused: false,
        turnCount: 1,
      };
      websocket.handleSetState(gameState);
    } else {
      console.error("Unexpected button type:", buttonType);
    }
  };

  if(!gameInfo) return <div>Loading...</div>
  return (
    <section>
      <div className="wappper">
        <h1>UPBEAT</h1>
        <div className="player">
          <div className="player_1">
            <div>
              <img src="/src/assets/material/profile.png" />
            </div>
            <button>player 1</button>
          </div>

          <div className="player_2">
            <div>
              <img src="/src/assets/material/blueprofile.png" />
            </div>
            <button>player 2</button>
          </div>

          <div className="player_3">
            <div>
              <img src="/src/assets/material/greyprofile.png" />
            </div>
            <button>player 3</button>
          </div>

          <div className="player_4">
            <div>
              <img src="/src/assets/material/yellowprofile.png" />
            </div>
            <button>player 4</button>
          </div>
        </div>
        <div className="button">
          <button type="submit" onClick={() => handleClick("start")}>
            START
          </button>
          <button type="submit" onClick={() => handleClick("join")}>
            JOIN
          </button>
        </div>
      </div>
    </section>
  );
}

export default Lobby;
