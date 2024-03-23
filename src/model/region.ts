import { Player } from "./player";
import { Position } from "./position";

export interface Region {
  isCityCenter: number;
  deposit: number;
  pos: Position;
  owner: Player | null;
  standOn: Player | null;
}
