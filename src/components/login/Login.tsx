import { SyntheticEvent, useEffect, useState } from "react";
import "./Login.css";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import useWebSocket from "@/websocket/useWebsocket";
import { useMutationLogin } from "@/query/game";
import { Account } from "@/model/account";
import { useAppDispatch } from "@/redux/hook";
import { setPlayer } from "@/redux/slices/player";

function Login() {
  const navigate = useNavigate();
  const websocket = useWebSocket();
  useEffect(() => {
    websocket.connect();
  }, []);
  const mutationLogin = useMutationLogin();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const acct: Account = {
      username,
      password,
    };

    const player = await mutationLogin.mutateAsync(acct);

    if (player) {
      websocket.getData();
      dispatch(setPlayer(player));
      navigate("/lobby");
    } else if (!player) {
      alert("Invalid username or password. Please try again.");
    }
  };

  const handleGoToSignup = () => {
    navigate("/signup");
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

          <div className="wrapper_Login">
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
              <div className="container">
                <button type="submit">Login</button>
                <button type="submit" onClick={handleGoToSignup}>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
