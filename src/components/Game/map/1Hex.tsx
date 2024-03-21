import React from 'react';

interface HexProps {
  yPos: number;
  xPos: number;
}

const Hex: React.FC<HexProps> = ({ xPos, yPos }) => {
  return (
    <div className="hexagon" style={{ top: yPos, left: xPos }}>
      <div className="hexagontent"></div>
    </div>
  );
};

export default React.memo(Hex);