import React from "react";
import UFO from "./UFO";
import Alien from "./Alien";
import "./1Hex.css";

interface HexProps {
  yPos: number;
  xPos: number;
  hslColor: string;
  isCityCenter: number;
  crewColor: string | null;
}

const Hex: React.FC<HexProps> = ({
  xPos,
  yPos,
  hslColor,
  isCityCenter,
  crewColor,
}) => {
  console.log("crewColor = ", crewColor);
  const isTalent = () => {
    if (isCityCenter && crewColor) {
      return <UFO fillColor={hslColor} />;
    } else if (crewColor) {
      return <Alien fillColor={crewColor} />;
    } else if (isCityCenter) {
      return <UFO fillColor={hslColor} />;
    }
  };
  return (
    <div
      className="hexagon"
      style={{
        top: yPos,
        left: xPos,
        backgroundColor: hslColor,
      }}
    >
      <div className="hexagontent">{isTalent()}</div>
    </div>
  );
};

export default Hex;
