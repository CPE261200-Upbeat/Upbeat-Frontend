import "../lobby/Lobby.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { selectGame } from "@/redux/slices/game";
import { selectPlayer } from "@/redux/slices/player";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { BEGIN_STATE } from "../Game/config/constant";
import { Player } from "@/model/player";
import { GameState } from "@/model/gameState";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdColorPalette } from "react-icons/io";
import { HuePicker } from "react-color";

function Lobby() {
  const navigate = useNavigate();
  const websocket = useWebSocket();
  const [isJoined, setIsJoined] = useState(false);
  const gameInfo: GameInfo = useAppSelector(selectGame);
  const players: Player[] = gameInfo.players.list;
  const player: Player = useAppSelector(selectPlayer);
  const isFirstPlayer =
    JSON.stringify(player?.acct) === JSON.stringify(players[0]?.acct);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isHuePickerOpen, setIsHuePickerOpen] = useState(false);

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

  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
  };

  const handleColorPickerTrigger = () => {
    setIsHuePickerOpen(!isHuePickerOpen);
  };

  return (
    <section>
      <div className="wappper_Lobby">
        <FaSignOutAlt className="FaSignOutAlt" onClick={handleLogout} />
        <h1>UPBEAT</h1>
        <div className="player_wrapper">
          {gameInfo.players.list.map((player) => (
            <div key={player.acct.username} className="player">
              <div className="user_container">
                {isHuePickerOpen &&
                  player.acct.username === player.acct.username && (
                    <div className="color-picker-container">
                      <HuePicker
                        color={selectedColor || "#ffffff"}
                        width="200px"
                        height="15px"
                        onChange={handleColorChange}
                      />
                    </div>
                  )}
                <FaUserCircle
                  className="user"
                  color={
                    player.acct.username === player.acct.username
                      ? selectedColor || `hsl(${player.color}, 100%, 50%)`
                      : `hsl(${player.color}, 100%, 50%)`
                  }
                />
                {player.acct.username === player.acct.username && (
                  <IoMdColorPalette
                    className="ColorPalette"
                    onClick={handleColorPickerTrigger}
                  />
                )}
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
