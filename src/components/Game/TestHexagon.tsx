import "./map/1Hex.css";
import Alien from "./map/Alien";
import UFO from "./map/UFO";
import Hex from "./map/1Hex";

function TestHexagon() {
  return (
    <div>
      <div
        className="hexagon"
        style={{
          backgroundColor: " hsl(100,100%,80%)",
        }}
      >
        <div className="hexagontent">
          <UFO fillColor="hsl(100,100%,50%)" />
        </div>
      </div>
    </div>
  );
}

export default TestHexagon;
