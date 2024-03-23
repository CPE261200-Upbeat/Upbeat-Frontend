import "../lobby/Lobby.css";
import { Credential } from "model/credential";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { selectGame } from "@/redux/slices/game";
import { useAppSelector } from "@/redux/hook";
import { GameState } from "@/model/gameState";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

function Lobby() {
  const navigate = useNavigate();
  const websocket = useWebSocket();
  const credential: Credential | null = JSON.parse(
    localStorage.getItem("acct") || "null"
  );

  const gameInfo: GameInfo = useAppSelector(selectGame);

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (gameInfo.gameState?.isBegin) {
      navigate("/game");
    }
  }, [gameInfo]);

  const handleClick = (buttonType: string) => {
    if (buttonType === "join") {
      websocket.handleJoin(credential!);
    } else if (buttonType === "start") {
      const gameState: GameState = {
        isOver: 0,
        isBegin: 1,
        isPaused: 0,
        isError: 0,
        turnCount: 1,
      };
      websocket.handleSetState(gameState);
    } else {
      console.error("Unexpected button type:", buttonType);
    }
  };

  return (
    <section>
      <div className="wappper_Lobby">
        <CiLogout className="CiLogout" onClick={handleLogout} />
        <h1>UPBEAT</h1>
        <div className="player_wrapper">
          {gameInfo.players.list.map((player) => (
            <div className="player">
              <div>
                <FaUserCircle className="user" color="rgb(0, 0, 0)" />
              </div>
              <button>{player.acct.username}</button>
            </div>
          ))}
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
