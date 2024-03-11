import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NoPage from "./components/noPage/NoPage.tsx";
import Login from "./components/login/Login.tsx";
import Game from "./components/game/Game.tsx";
import SignUp from "./components/signUp/SignUp.tsx";
import LeaderBoard from "./components/game/leaderboard/Leaderboard.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Login />,
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
    path: "game",
    element: <Game />,
  },
  {
    path: "leaderboard",
    element: <LeaderBoard />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
