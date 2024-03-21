interface MapProps {
    gameMap: JSX.Element[][];
  }
  
  export function Map({gameMap} : MapProps) {
    return (
      <div>{gameMap.map((row,idx)=> <div key = {idx}>{row}</div>)}</div>
    )
  }
  
  export default Map;
  