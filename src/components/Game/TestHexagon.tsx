import "./map/1Hex.css";
import UFO from "./map/UFO";

function TestHexagon() {
  return (
    <div>
      <div className="hexagon">
        <div className="hexagontent">
          <UFO fillColor={300} />
        </div>
      </div>
    </div>
  );
}

export default TestHexagon;
