import { Config } from "./config";
import { GameState } from "./gameState";
import { Player } from "./player";
import { Region } from "./region";

export interface GameInfo {
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
