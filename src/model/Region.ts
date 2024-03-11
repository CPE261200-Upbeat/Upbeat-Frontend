import { Position } from "./Position";
import { Player } from "./Player";

export interface Region {
    isCityCenter: boolean;
    deposit : number;
    pos: Position;
    owner : Player;
  }
  