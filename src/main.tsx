import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoPage from "./components/noPage/NoPage.tsx";
import Login from "./components/login/Login.tsx";
import SignUp from "./components/signUp/SignUp.tsx";
import Game from "./components/Game/Game.tsx";
import Info from "./components/Game/Info.tsx";
import LeaderBoard from "./components/Game/leaderboard/Leaderboard.tsx";
import Lobby from "./components/lobby/Lobby.tsx";
import Win from "./components/win/Win.tsx";
import Lose from "./components/lose/Lose.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const router = createBrowserRouter([
  {
    path: "",
    element: <Info />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "lobby",
    element: <Lobby />,
  },
  {
    path: "game",
    element: <Game />,
  },
  {
    path: "leaderboard",
    element: <LeaderBoard />,
  },
  {
    path: "info",
    element: <Info />,
  },
  {
    path: "win",
    element: <Win />,
  },
  {
    path: "lose",
    element: <Lose />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);
const queryClient = new QueryClient();
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </QueryClientProvider>
    </Provider>
  );
} else {
  console.error("Root element not found");
}
