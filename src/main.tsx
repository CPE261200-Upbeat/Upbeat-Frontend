import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./components/Login.tsx";
import Game from "./components/Game/Game";
import SignUp from "./components/SingUp.tsx";
import LeaderBoard from "./components/LeaderBoard";
import NoPage from "./components/NoPage.tsx";

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
