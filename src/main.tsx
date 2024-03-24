import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoPage from "./components/noPage/NoPage.tsx";
import Login from "./components/login/Login.tsx";
import SignUp from "./components/signUp/SignUp.tsx";
import Game from "./components/Game/Game.tsx";
import Info from "./components/Game/Info.tsx";
import LeaderBoard from "./components/leaderboard/Leaderboard.tsx";
import Lobby from "./components/lobby/Lobby.tsx";
import Init from "./components/Init/Init.tsx";
import Win from "./components/win/Win.tsx";
import Lose from "./components/lose/Lose.tsx";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TestHexagon from "./components/Game/TestHexagon.tsx";
import { store } from "./redux/store.ts";
// import TestSomething from "./components/Game/GameDev.tsx";
const router = createBrowserRouter([
  {
    path: "testSomething",
    element: <TestHexagon />,
    //element: <TestSomething />,
  },
  {
    path: "",
    element: <SignUp />,
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
    path: "init",
    element: <Init />,
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
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
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
