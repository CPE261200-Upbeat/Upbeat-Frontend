
import { configureStore } from '@reduxjs/toolkit'
import webSocketReducer from './slices/websocket'
import playerReducer from  './slices/player'
import gameReducer from  './slices/game'
export const store = configureStore({
    reducer: {
        game: gameReducer,
        player: playerReducer,
        websocket: webSocketReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
  })
  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch