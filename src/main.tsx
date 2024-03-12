import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NoPage from "./components/noPage/NoPage.tsx";
import Login from "./components/login/Login.tsx";
import SignUp from "./components/signUp/SignUp.tsx";
import Game from "./components/Game/Game.tsx";
import Info from "./components/Game/Info.tsx";
import LeaderBoard from "./components/Game/leaderboard/Leaderboard.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
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
    path: "*",
    element: <NoPage />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store ={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  );
} else {
  console.error("Root element not found");
}
