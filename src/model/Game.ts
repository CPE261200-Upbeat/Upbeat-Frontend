import { Config } from "./Config";
import { GameState } from "./GameState";
import { Player } from "./Player";
import { Region } from "./Region";

export interface GameInfoResponse {
  config: Config;
  players: {
    list: Player[];
    turn: number;
  };
  gameMap: {
    regions: Region[][];
  };
  gameState: GameState;
}
