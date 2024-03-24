import React from "react";
import UFO from "./UFO";
import Alien from "./Alien";
import "./1Hex.css";
import { Region } from "@/model/region";
import { Player } from "@/model/player";

interface HexProps {
  yPos: number;
  xPos: number;
  hslColor: string;
  isCityCenter: number;
  crewColor: string | null;
  region: Region;
}

const Hex: React.FC<HexProps> = ({
  xPos,
  yPos,
  hslColor,
  isCityCenter,
  crewColor,
  region,
}) => {
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
      <div className="hexagontent">
        {isTalent()}
        {region.deposit !== 0 &&
          JSON.stringify(Math.trunc(region.deposit), null, 2)}
      </div>
    </div>
  );
};

export default Hex;
