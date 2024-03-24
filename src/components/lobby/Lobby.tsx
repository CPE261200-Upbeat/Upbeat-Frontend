import "../lobby/Lobby.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectGame } from "@/redux/slices/game";
import { selectPlayer } from "@/redux/slices/player";
import useWebSocket from "@/websocket/useWebsocket";
import { GameInfo } from "@/model/game";
import { Player } from "@/model/player";
import { FaUserCircle, FaSignOutAlt, FaTrophy } from "react-icons/fa";
import { IoMdColorPalette } from "react-icons/io";
import { ColorResult, SwatchesPicker } from "react-color";
import { BEGIN_STATE } from "../../config/constant";
import { LobbyInfo } from "@/model/lobbyInfo";
import { selectLobby, setJoined } from "@/redux/slices/lobby";
function Lobby() {
  const navigate = useNavigate();
  const websocket = useWebSocket();
  const dispatch = useAppDispatch();
  const gameInfo: GameInfo = useAppSelector(selectGame);
  const lobbyInfo: LobbyInfo = useAppSelector(selectLobby);
  const currentPlayer: Player = useAppSelector(selectPlayer);
  const players: Player[] = gameInfo.players.list;
  const isFirstPlayer =
    JSON.stringify(currentPlayer?.acct) === JSON.stringify(players[0]?.acct);

  const [selectedColor, setSelectedColor] = useState<ColorResult>();
  const [isHuePickerOpen, setIsHuePickerOpen] = useState(false);

  const handleLogout = () => {
    websocket.handleDisconnect(currentPlayer);
    dispatch(setJoined(false));
    navigate("/login");
  };

  const handleGoToleaderboard = () => {
    navigate("/leaderboard");
  };

  useEffect(() => {
    if (gameInfo.gameState?.isBegin) {
      navigate("/init");
    }
  }, [gameInfo]);

  const handleClick = (buttonType: string) => {
    if (buttonType === "join") {
      websocket.handleJoin(currentPlayer);
      dispatch(setJoined(true));
    } else if (buttonType === "disconnect") {
      websocket.handleDisconnect(currentPlayer);
      dispatch(setJoined(false));
    } else if (buttonType === "start") {
      websocket.handleSetState(BEGIN_STATE);
    } else {
      console.error("Unexpected button type:", buttonType);
    }
  };

  const handleColorChange = (color: any) => {
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
        <FaTrophy className="FaTrophy" onClick={handleGoToleaderboard} />
        <h1>UPBEAT</h1>
        <div className="player_wrapper">
          {gameInfo.players.list.map((player) => (
            <div key={player.acct.username} className="player">
              <div className="user_container">
                {activeColorPickerUser === player.acct.username &&
                  currentPlayer.acct.username === player.acct.username && (
                    <div className="color-picker-container">
                      <SwatchesPicker
                        color={"#ffffff"}
                        width={parseInt("200")}
                        height={parseInt("150")}
                        className="Picker"
                        onChange={handleColorChange}
                      />
                    </div>
                  )}
                <FaUserCircle
                  className="user"
                  color={`hsl(${player.color}, 100%, 50%)`}
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
          {lobbyInfo.isJoined ? (
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
