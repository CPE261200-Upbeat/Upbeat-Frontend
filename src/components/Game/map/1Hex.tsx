import React from "react";
import "./1Hex.css";

interface AppProps {
  key: string;
  yPos: number;
  xPos: number;
}

const App: React.FC<AppProps> = ({ yPos, xPos, key }) => {
  return (
    // <div className="hex-container">
    //   <img
    //     src={imageUrl}
    //     alt="Hexagonal"
    //     className={`hex-image`}
    //     style={{ top: yPos, left: xPos }}
    //   />
    // </div>

    <div className="hexagon" style={{ top: yPos, left: xPos }}>
      <div className="hexagontent"></div>
    </div>
  );
};

export default App;
