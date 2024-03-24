import { GameState } from "@/model/gameState";

export const INIT_X_POS = 450; // X Pos เริ่มต้น
export const INIT_Y_POS = 80; // Y Pos เริ่มต้น
export const X_POS_INCREMENT = 50; // X Gap ของแต่ละ Col
export const Y_POS_INCREMENT = 62; // Y Gap ของแต่ละ Row
export const Y_POS_OFFSET = 30; // Y Gap ของแต่ละ Col (Even Col , Odd Col)

export const RESET_STATE: GameState = {
  isOver: 0,
  isBegin: 0,
  isPaused: 0,
  isError: 0,
  turnCount: 1,
  readyCount: 0,
};
export const BEGIN_STATE: GameState = {
  isOver: 0,
  isBegin: 1,
  isPaused: 0,
  isError: 0,
  turnCount: 1,
  readyCount: 0,
};
