import "../lobby/Lobby.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { selectGame } from "@/redux/slices/game";
import { selectPlayer } from "@/redux/slices/player";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { Player } from "@/model/player";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdColorPalette } from "react-icons/io";
import { Color, ColorResult, HuePicker } from "react-color";
import { BEGIN_STATE } from "../Game/config/constant";

function Lobby() {
  const navigate = useNavigate();
  const websocket = useWebSocket();
  const gameInfo: GameInfo = useAppSelector(selectGame);
  const currentPlayer: Player = useAppSelector(selectPlayer);
  const players: Player[] = gameInfo.players.list;
  const joined: boolean = players.some(
    (player) =>
      JSON.stringify(player.acct) === JSON.stringify(currentPlayer.acct)
  );
  const isFirstPlayer =
    JSON.stringify(currentPlayer?.acct) === JSON.stringify(players[0]?.acct);
  const [isJoined, setIsJoined] = useState(joined);

  const [selectedColor, setSelectedColor] = useState<ColorResult>();
  const [isHuePickerOpen, setIsHuePickerOpen] = useState(false);

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
      websocket.handleJoin(currentPlayer);
      setIsJoined(true);
    } else if (buttonType === "disconnect") {
      websocket.handleDisconnect(currentPlayer);
      setIsJoined(false);
    } else if (buttonType === "start") {
      websocket.handleSetState(BEGIN_STATE);
    } else {
      console.error("Unexpected button type:", buttonType);
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color);
  };

  const [activeColorPickerUser, setActiveColorPickerUser] = useState(null);

  const handleColorPickerTrigger = (username: any) => {
    setActiveColorPickerUser(
      username === activeColorPickerUser ? null : username
    );
    setIsHuePickerOpen(!isHuePickerOpen);
    if (currentPlayer && selectedColor)
      websocket.handleSetColor(currentPlayer, Math.trunc(selectedColor.hsl.h));
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
                {activeColorPickerUser === player.acct.username &&
                  currentPlayer.acct.username === player.acct.username && (
                    <div className="color-picker-container">
                      <HuePicker
                        color={selectedColor?.hex || "#ffffff"}
                        width="200px"
                        height="15px"
                        onChange={handleColorChange}
                      />
                    </div>
                  )}
                <FaUserCircle
                  className="user"
                  color={
                    currentPlayer.acct.username === player.acct.username
                      ? selectedColor?.hex || `hsl(${player.color}, 100%, 50%)`
                      : `hsl(${player.color}, 100%, 50%)`
                  }
                />
                {currentPlayer.acct.username === player.acct.username && (
                  <IoMdColorPalette
                    className="ColorPalette"
                    onClick={() =>
                      handleColorPickerTrigger(player.acct.username)
                    }
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
