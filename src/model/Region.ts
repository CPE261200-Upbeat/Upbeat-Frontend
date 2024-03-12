
import { Player } from "./Player";
import { Position } from "./position";

export interface Region {
    isCityCenter: boolean;
    deposit : number;
    pos: Position;
    owner : Player | null;
  }
  