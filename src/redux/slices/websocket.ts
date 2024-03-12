import Stomp from "stompjs";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface webSocketState {
    isConnected: boolean;
    stompClient: Stomp.Client | undefined;
}

const initialState: webSocketState = {
    isConnected: false,
    stompClient: undefined,
};


export const webSocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
      setStompClient: (state, action: PayloadAction<Stomp.Client>) => {
          state.stompClient = action.payload;
      },
      setIsConnected:(state, action: PayloadAction<boolean>) =>{
          state.isConnected = action.payload
      }
  },
});

export const {setStompClient ,setIsConnected } = webSocketSlice.actions;
export default webSocketSlice.reducer;
export const selectWebsocket = (state: RootState) => state.webSocket

