import React from "react";
import "../lobby/Lobby.css";

function Lobby() {
  return (
    <section>
      <div className="wappper">
        <h1>UPBEAT</h1>
        <div className="player">
          <div className="player_1">
            <div>
              <img src="/src/assets/material/profile.png" />
            </div>
            <button>player 1</button>
          </div>

          <div className="player_2">
            <div>
              <img src="/src/assets/material/blueprofile.png" />
            </div>
            <button>player 2</button>
          </div>

          <div className="player_3">
            <div>
              <img src="/src/assets/material/greyprofile.png" />
            </div>
            <button>player 3</button>
          </div>

          <div className="player_4">
            <div>
              <img src="/src/assets/material/yellowprofile.png" />
            </div>
            <button>player 4</button>
          </div>
        </div>
        <div className="button">
          <button type="submit">START</button>
          <button type="submit">JOIN</button>
        </div>
      </div>
    </section>
  );
}

export default Lobby;
