// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFrom from "./pages/login.tsx";
import Singup from "./pages/singup.tsx";

function App() {
  const routes = [
    {
      path: "/",
      lazy: () => import("./pages/login.tsx"),
    },
    {
      path: "/game",
      lazy: () => import("./pages/Game.tsx"),
    },
    {
      path: "/profile",
      lazy: () => import("./pages/Profile.tsx"),
    },
    {
      path: "/leaderboard",
      lazy: () => import("./pages/LeaderBoard.tsx"),
    },
  ];
  // const router = createBrowserRouter(routes);
  // return <RouterProvider router={router} />;

  return (
    <>
      <div>
        {/* <LoginFrom/> */}
        <Singup />
      </div>
    </>
  );
}

export default App;
