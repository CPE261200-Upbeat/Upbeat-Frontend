import React from "react";
import UFO from "./UFO";

interface HexProps {
  yPos: number;
  xPos: number;
  hslColor: string;
  isCityCenter: number;
}

const Hex: React.FC<HexProps> = ({ xPos, yPos, hslColor, isCityCenter }) => {
  return (
    <div
      className="hexagon"
      style={{ top: yPos, left: xPos, backgroundColor: hslColor }}
    >
      <div className="hexagontent">
        {isCityCenter && <UFO fillColor={hslColor} />}
      </div>
    </div>
  );
};

export default React.memo(Hex);
