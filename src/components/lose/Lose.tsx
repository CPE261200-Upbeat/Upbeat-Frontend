import "./Lose.css";

function lose() {
  return (
    <section>
      <div className="wapper">
        <div className="game">
          <img src="/src/assets/material/Game_over.gif" />
        </div>
        <div className="container">
          <img className="skull" src="/src/assets/material/skull.gif" />
          <div className="lose">YOU LOSE</div>
          <img className="thunder" src="/src/assets/material/thunder.gif" />
        </div>
        <button type="submit">EXIT</button>
      </div>
    </section>
  );
}

export default lose;
