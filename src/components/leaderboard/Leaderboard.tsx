import "../leaderboard/Leaderboard.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { GameInfo } from "@/model/game";
import { useAppSelector } from "@/redux/hook";
import { selectGame } from "@/redux/slices/game";

function Leaderboard() {
  const navigate = useNavigate();
  const gameInfo: GameInfo = useAppSelector(selectGame);
  const handleLogout = () => {
    navigate("/lobby");
  };

  return (
    <section>
      <FaSignOutAlt className="GotoLobby" onClick={handleLogout} />
      <div className="container_Leaderboard">
        <div className="border_head">
          <div className="head">LEADERBOARD</div>
        </div>

        <div className="border_box">
          <div className="box">
            <div className="row-container">
              {gameInfo.players.list.map((player, idx) => (
                <div className="row" key={player.acct.username}>
                  <img
                    src={`/src/assets/material/${
                      idx === 0
                        ? "gold.png"
                        : idx === 1
                        ? "silver.png"
                        : idx === 2
                        ? "bronze.png"
                        : idx + 1
                    }`}
                  />
                  <FaUserCircle className="profile" />
                  <div className="Player">player.username</div>
                  <div className="score">player.score</div>
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
