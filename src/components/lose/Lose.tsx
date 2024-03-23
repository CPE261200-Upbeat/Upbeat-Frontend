import "./Lose.css";
import { useNavigate } from "react-router-dom";

function Lose() {
  const navigate = useNavigate();

  const handleGoToLobby = async() => {
    navigate("/lobby");
  };

  return (
    <section>
      <div className="wapper_Lose">
        <div className="game">
          <img src="/src/assets/material/Game_over.gif" alt="Game over" />
        </div>
        <div className="container">
          <img
            className="skull"
            src="/src/assets/material/skull.gif"
            alt="Skull"
          />
          <div className="lose">YOU LOSE</div>
          <img
            className="thunder"
            src="/src/assets/material/thunder.gif"
            alt="Thunder"
          />
        </div>
        <div className="btn">
          <button type="button" onClick={handleGoToLobby}>
            LOBBY
          </button>
          <button type="button">EXIT</button>
        </div>
      </div>
    </section>
  );
}

export default Lose;
