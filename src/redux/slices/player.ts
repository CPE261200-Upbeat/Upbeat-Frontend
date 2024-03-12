import { Player } from "../../model/player";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: Player = {
    acct: { username: '', password: '' }, 
    budget: 0,
    cityCenter: { 
        isCityCenter: false,
        deposit : 0,
        pos: {
            row: 0 ,
            col: 0 ,
        },
        owner : null,
    },
    crew: {
        pos : {
            row: 0 ,
            col: 0 ,
        },
    },
    timeLeft: 0,
    constructionPlan: '',
    defeat: false
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
      setPlayer: (state, action: PayloadAction<Player>) => {
          state = action.payload;
      },
  },
});

export const {setPlayer} = playerSlice.actions;
export const selectPlayer = (state: RootState) => state.player;
export default playerSlice.reducer;
