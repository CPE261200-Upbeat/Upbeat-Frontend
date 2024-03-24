import { LobbyInfo } from "@/model/lobbyInfo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const initialState: LobbyInfo = {
  isJoined: false,
};

export const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    setJoined: (state, action: PayloadAction<boolean>) => {
      state.isJoined = action.payload;
    },
  },
});

export const { setJoined } = lobbySlice.actions;
export const selectLobby = (state: RootState) => state.lobby;
export default lobbySlice.reducer;
