import "../lobby/Lobby.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { selectGame } from "@/redux/slices/game";
import { useAppSelector } from "@/redux/hook";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { selectPlayer } from "@/redux/slices/player";
import { Player } from "@/model/player";
import { BEGIN_STATE } from "../Game/config/constant";

function Lobby() {
  const navigate = useNavigate();
  const websocket = useWebSocket();
  const [isJoined, setIsJoined] = useState(false);

  const gameInfo: GameInfo = useAppSelector(selectGame);
  const players: Player[] = gameInfo.players.list;
  const player: Player = useAppSelector(selectPlayer);
  const isFirstPlayer =
    JSON.stringify(player?.acct) === JSON.stringify(players[0]?.acct);

  const handleLogout = () => {
    websocket.handleDisconnect(player);
    navigate("/login");
  };

  useEffect(() => {
    if (gameInfo.gameState?.isBegin) {
      navigate("/game");
    }
  }, [gameInfo]);

  const handleClick = (buttonType: string) => {
    if (buttonType === "join") {
      websocket.handleJoin(player);
      setIsJoined(true);
    } else if (buttonType === "disconnect") {
      websocket.handleDisconnect(player);
      setIsJoined(false);
    } else if (buttonType === "start") {
      websocket.handleSetState(BEGIN_STATE);
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
            <button type="submit" onClick={() => handleClick("disconnect")}>
              DISCONNECT
            </button>
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
