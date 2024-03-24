import "./Win.css";
import { useNavigate } from "react-router-dom";

function Win() {
  const navigate = useNavigate();

  const handleGoToLobby = async () => {
    navigate("/lobby");
  };

  return (
    <section>
      <div className="wapper_Win">
        <div className="game">
          <img src="/src/assets/material/Game_over.gif" />
        </div>
        <div className="container">
          <img className="trophy" src="/src/assets/material/trophy.gif" />
          <div className="win">YOU WIN</div>
          <img className="star" src="/src/assets/material/star.gif" />
        </div>
        <div className="btn">
          <button type="button" onClick={() => handleGoToLobby()}>
            LOBBY
          </button>
        </div>
      </div>
    </section>
  );
}

export default Win;
