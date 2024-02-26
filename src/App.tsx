import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Game from "./components/Game";
import Profile from "./components/Profile";
import LeaderBoard from "./components/LeaderBoard";
import SignUp from "./components/SignUp";

function App() {
  const routes = [
    {
      path: "/",
      loader: () => Login,
    },
    {
      path: "/game",
      loader: () => Game,
    },
    {
      path: "/profile",
      loader: () => Profile,
    },
    {
      path: "/leaderboard",
      loader: () => LeaderBoard,
    },
    {
      path: "/signup",
      loader: () => SignUp,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
