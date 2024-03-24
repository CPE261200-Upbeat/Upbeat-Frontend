import { configureStore } from "@reduxjs/toolkit";
import webSocketReducer from "./slices/websocket";
import gameReducer from "./slices/game";
import playerReducer from "./slices/player";
import lobbyReducer from "./slices/lobby";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
    lobby: lobbyReducer,
    webSocket: webSocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
