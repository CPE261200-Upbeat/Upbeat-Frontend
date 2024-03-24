import "../lobby/Lobby.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { selectGame } from "@/redux/slices/game";
import { selectPlayer } from "@/redux/slices/player";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { Player } from "@/model/player";
import { GameState } from "@/model/gameState";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdColorPalette } from "react-icons/io";
import { HuePicker } from "react-color";

function Lobby() {
  const navigate = useNavigate();
  const websocket = useWebSocket();
  const [isJoined, setIsJoined] = useState(false);
  const [isFirstPlayer, setIsFirstPlayer] = useState(false);
  const [selectedColorHSL, setSelectedColorHSL] = useState(null);
  const [isHuePickerOpen, setIsHuePickerOpen] = useState(false);
  const gameInfo: GameInfo = useAppSelector(selectGame);
  const currentPlayer: Player = useAppSelector(selectPlayer);

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
      websocket.handleJoin(currentPlayer);
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

  const handleColorChange = (color: any) => {
    setSelectedColorHSL(color.hsl);
  };

  const [activeColorPickerUser, setActiveColorPickerUser] = useState(null);

  const handleColorPickerTrigger = (username: any) => {
    setActiveColorPickerUser(
      username === activeColorPickerUser ? null : username
    );
    setIsHuePickerOpen(!isHuePickerOpen);
    console.log(!isHuePickerOpen);
    console.log(selectedColorHSL);
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
                        color={selectedColorHSL || "#ffffff"}
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
                      ? selectedColorHSL || `hsl(${player.color}, 100%, 50%)`
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
