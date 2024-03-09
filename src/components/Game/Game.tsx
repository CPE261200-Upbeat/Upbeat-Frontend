import React from "react";
import Popup from "./planPopUp.1.tsx";
import "./Game.css";
import App from "./1Hex"; // Import the App component
import hexBlack from "../assets/material/hex/hex-black.png";
import hexClear from "../assets/material/hex/hex-clear.png";
import hexGreen from "../assets/material/hex/hex-green.png";

function AppWrapper() {
  const images = [];
  let xPosition = 350;
  let yPosition = 50;
  const nRow = 15;
  const nColumn = 10;
  for (let i = 0; i < nRow; i++) {
    const row = [];

    for (let j = 0; j < nColumn; j++) {
      const key = `${i},${j}`;
      const imageUrl = hexClear; //change for game methods
      row.push(
        <App yPos={yPosition} xPos={xPosition} key={key} imageUrl={imageUrl} />
      );
      yPosition += 62;
    }
    images.push(row);
    if (i % 2 === 0) {
      yPosition = 81;
      xPosition += 48;
    } else {
      yPosition = 50;
      xPosition += 48;
    }
  }

  return (
    <div>
      {images.map((row, rowIndex) => (
        <div key={rowIndex}>{row}</div>
      ))}
      <button className="popUp">PopUp</button>
      <Popup trigger={true}>
        <h3>My popup</h3>
      </Popup>
    </div>
  );
}

export default AppWrapper;
