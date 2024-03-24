import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameInfo } from "model/game";
import { RootState } from "redux/store";

export const initialState: GameInfo = {
  config: {
    m: 0,
    n: 0,
    initPlanMin: 0,
    initPlanSec: 0,
    initBudget: 0,
    initCenterDep: 0,
    planRevMin: 0,
    planRevSec: 0,
    revCost: 0,
    maxDep: 0,
    interestPct: 0,
  },
  players: {
    list: [],
    turn: 0,
  },
  gameMap: {
    regions: [],
  },
  gameState: {
    isBegin: 0,
    isTurnBegin: 0,
    isOver: 0,
    isPaused: 0,
    isError: 0,
    turnCount: 0,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameInfo: (state, action: PayloadAction<GameInfo>) => {
      state.config = action.payload.config;
      state.players = action.payload.players;
      state.gameMap = action.payload.gameMap;
      state.gameState = action.payload.gameState;
    },
  },
});

export const { setGameInfo } = gameSlice.actions;
export const selectGame = (state: RootState) => state.game;
export default gameSlice.reducer;
