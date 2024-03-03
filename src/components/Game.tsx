// import React from "react";
// import "./Game.css";
// import hexClear from "../assets/material/hex-clear.png";

// // Component for the hexagonal shape with an image
// const HexagonImage: React.FC<{ src: string; size: number }> = ({
//   src,
//   size,
// }) => {
//   const hexagonStyle: React.CSSProperties = {
//     width: `${size}px`,
//     height: `${size}px`,
//     clipPath: `polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`,
//   };

//   return <img src={src} alt="Hexagon" style={hexagonStyle} />;
// };

// // Component representing the grid
// const Grid: React.FC = () => {
//   const gridSize = 10;
//   const hexSize = 60; // Adjust size as needed

//   const gridStyle: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: `repeat(${gridSize}, ${hexSize}px)`,
//     gridAutoRows: `${hexSize}px`,
//   };

//   return (
//     <div style={gridStyle}>
//       {Array.from({ length: gridSize * gridSize }).map((_, index) => (
//         <HexagonImage key={index} src={hexClear} size={hexSize} />
//       ))}
//     </div>
//   );
// };

// // Usage
// function App() {
//   return (
//     <div>
//       <Grid />
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./Game.css"; // assuming you have your CSS file
import image1 from "../assets/material/hex-black.png"; // Import your image files
import image2 from "./image2.jpg"; // Import your image files
// Import other images as needed

function App() {
  const gridSize = 10;
  const hexSize = 100; // Assuming each hexagon size is 100px
  const imageSize = 50; // Adjust the size of the images

  const shouldMoveRight = (row: number) => row % 2 === 0; // Function to determine if row should move right

  const renderRows = () => {
    let rows = [];
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
      let hexagons = [];
      for (let colIndex = 0; colIndex < gridSize; colIndex++) {
        hexagons.push(
          <div key={colIndex} className="hexagon">
            <img
              src={colIndex % 2 === 0 ? image1 : image1}
              alt={`Image ${rowIndex * gridSize + colIndex + 1}`}
              style={{ width: imageSize, height: imageSize }} // Apply size directly to the image
            />
          </div>
        );
      }
      rows.push(
        <div
          key={rowIndex}
          className={`row ${shouldMoveRight(rowIndex + 1) ? "move-right" : ""}`}
        >
          {hexagons}
        </div>
      );
    }
    return rows;
  };

  return <div className="container">{renderRows()}</div>;
}

export default App;
