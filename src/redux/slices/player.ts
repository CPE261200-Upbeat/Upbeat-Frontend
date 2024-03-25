import { Player } from "@/model/player";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const initialState: Player = {
  acct: {
    username: "",
    password: "",
  },
  budget: 0,
  crew: null,
  cityCenter: null,
  planRevTime: 0,
  constructionPlan: "",
  color: 0,
  isDefeat: 0,
  winCount: 0,
};

export const gameSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player>) => {
      state.acct = action.payload.acct;
    },
  },
});

export const { setPlayer } = gameSlice.actions;
export const selectPlayer = (state: RootState) => state.player;
export default gameSlice.reducer;
