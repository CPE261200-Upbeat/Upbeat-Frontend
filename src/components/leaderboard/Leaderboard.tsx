import "../leaderboard/Leaderboard.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useQueryLeaderboard } from "@/query/game";
import { useAppSelector } from "@/redux/hook";
import { selectGame } from "@/redux/slices/game";
import { useEffect } from "react";
import { selectLobby } from "@/redux/slices/lobby";
import { LobbyInfo } from "@/model/lobbyInfo";

function Leaderboard() {
  const navigate = useNavigate();
  const gameInfo = useAppSelector(selectGame);
  const gameState = gameInfo.gameState;
  const lobbyInfo: LobbyInfo = useAppSelector(selectLobby);
  const queryLeaderboard = useQueryLeaderboard();

  const leaderboard = queryLeaderboard.data;

  useEffect(() => {
    if (lobbyInfo.isJoined && gameState.isBegin) navigate("/init");
  }, [gameInfo]);

  const handleGoToLobby = () => {
    navigate("/lobby");
  };

  if (!leaderboard) return;

  return (
    <section>
      <FaSignOutAlt className="GotoLobby" onClick={handleGoToLobby} />
      <div className="container_Leaderboard">
        <div className="border_head">
          <div className="head">LEADERBOARD</div>
        </div>

        <div className="border_box">
          <div className="box">
            <div className="row-container">
              {leaderboard.map((player, idx) => (
                <div className="row" key={player.acct.username}>
                  {idx <= 2 ? (
                    <img
                      src={`/src/assets/material/${
                        idx === 0
                          ? "gold.png"
                          : idx === 1
                          ? "silver.png"
                          : "bronze.png"
                      }`}
                    />
                  ) : (
                    idx + 1
                  )}
                  <FaUserCircle className="profile" />
                  <div className="Player">{player.acct.username}</div>
                  <div className="score">{player.winCount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
