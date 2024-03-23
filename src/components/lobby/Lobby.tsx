import "../lobby/Lobby.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { selectGame } from "@/redux/slices/game";
import { useAppSelector } from "@/redux/hook";
import { GameState } from "@/model/gameState";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { selectPlayer } from "@/redux/slices/player";
import { Player } from "@/model/player";

function Lobby() {
  const navigate = useNavigate();
  const websocket = useWebSocket();
  const [isJoined, setIsJoined] = useState(false);
  const [isFirstPlayer, setIsFirstPlayer] = useState(false); // Track first player status

  const gameInfo: GameInfo = useAppSelector(selectGame);
  const player: Player = useAppSelector(selectPlayer);
  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (gameInfo.gameState?.isBegin) {
      navigate("/game");
    }
    if (isJoined && gameInfo.players.list.length === 1) {
      setIsFirstPlayer(true);
    } else {
      setIsFirstPlayer(false);
    }
  }, [gameInfo, isJoined]);

  const handleClick = (buttonType: string) => {
    if (buttonType === "join") {
      websocket.handleJoin(player);
      setIsJoined(true);
    } else if (buttonType === "disconnect") {
      setIsJoined(false);
    } else if (buttonType === "start" && isFirstPlayer) {
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
        <FaSignOutAlt className="FaSignOutAlt" onClick={handleLogout} />
        <h1>UPBEAT</h1>
        <div className="player_wrapper">
          {gameInfo.players.list.map((player) => (
            <div key={player.acct.username} className="player">
              <div>
                <FaUserCircle
                  className="user"
                  color={`hsl(${player.color}, 100%, 50%)`}
                />
              </div>
              <button>{player.acct.username}</button>
            </div>
          ))}
        </div>
        <div className="button">
          {isFirstPlayer && (
            <button type="submit" onClick={() => handleClick("start")}>
              START
            </button>
          )}
          {isJoined ? (
            <button type="submit">DISCONNECT</button>
          ) : (
            <button type="submit" onClick={() => handleClick("join")}>
              JOIN
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Lobby;
