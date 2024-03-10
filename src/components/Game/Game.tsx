import React, { useState } from "react";
import { Textarea } from "@mantine/core";
import "./Game.css";
import Hex from "./1Hex"; // Import the App component
import hexClear from "../../assets/material/hex/hex-clear.png";
import hexBlack from "../../assets/material/hex/hex-black.png";
import hexGreen from "../assets/material/hex/hex-green.png";

function AppWrapper() {
  const [constructionPlan, setConstructionPlan] = useState(""); // State to store textarea value
  const [confirmedPlan, setConfirmedPlan] = useState("");

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
        <Hex yPos={yPosition} xPos={xPosition} key={key} imageUrl={imageUrl} />
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

  // Function to handle textarea change and update state
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log("Confirmed:", confirmedPlan, "\n");
    console.log("Textarea value:", event.target.value);
    setConstructionPlan(event.target.value);
  };

  //send data to confimedplan => send to back end
  const handleConfirmPlan = () => {
    setConfirmedPlan(constructionPlan);
    console.log("Confirmed:", confirmedPlan);
  };

  return (
    <div>
      {images.map((row, rowIndex) => (
        <div key={rowIndex}>{row}</div>
      ))}

      <div>
        <textarea
          className="ta10em"
          value={constructionPlan}
          onChange={handleTextareaChange}
          placeholder="Construction Plan"
        />
      </div>
      <button className="confirm" onClick={handleConfirmPlan}>
        confirm
      </button>
    </div>
  );
}

export default AppWrapper;
