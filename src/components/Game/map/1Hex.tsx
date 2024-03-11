import React from "react";

interface AppProps {
  imageUrl: string;
  yPos: number;
  xPos: number;
}

const App: React.FC<AppProps> = ({ imageUrl, yPos, xPos }) => {
  return (
    <div className="hex-container">
      <img
        src={imageUrl}
        alt="Hexagonal"
        className={`hex-image`}
        style={{ top: yPos, left: xPos }}
      />
    </div>
  );
};

export default App;
