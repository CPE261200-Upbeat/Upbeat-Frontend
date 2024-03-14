import { SyntheticEvent, useState } from "react";
import "./Login.css";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { useMutationLogin } from "../../query/game";
import useWebSocket from "../../websocket/useWebsocket";
import { Credential } from "model/credential";

function Login() {
  const websocket = useWebSocket();
  const mutationLogin = useMutationLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    websocket.connect();
    const acct: Credential = {
      username,
      password,
    };
    const player = await mutationLogin.mutateAsync(acct);
    if (player) {
      localStorage.setItem("acct", JSON.stringify(acct));
      window.location.href = "/lobby";
    }
  };

  return (
    <section>
      <div className="upbeat-wrapper">
        <div className="upbeat">
          <form onSubmit={handleSubmit}>
            <div className="from_upbeat">
              <h1 className="text-Upbeat">UPBEAT</h1>
              <h5 className="text-Hope">Hope you enjoy</h5>
              <div className="NPF">
                <button type="submit">presented by NPF</button>
              </div>
            </div>
          </form>

          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <h1>LOGIN</h1>
              <h3 className="name">username</h3>
              <div className="input-box">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FaUserCircle className="icon" />
              </div>
              <h3 className="name">password</h3>
              <div className="input-box">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#">Forgot password</a>
              </div>
              <div className="container">
                <button type="submit">Login</button>
                <button type="submit">Sign up</button>
              </div>
              <div className="guess">
                <a href="#">play as guess?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
