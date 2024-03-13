
import { Player } from "./player";
import { Position } from "./position";

export interface Region {
    isCityCenter: boolean;
    deposit : number;
    pos: Position;
    owner : Player | null;
  }
  
