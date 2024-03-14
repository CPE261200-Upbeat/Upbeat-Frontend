import { SyntheticEvent, useState } from "react";
import "../login/Login.css"; // Assuming Login.css styles the login form
import { FaUserCircle, FaLock } from "react-icons/fa";
import { useMutationSignUp } from "../../query/game";
import { Credential } from "model/credential";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const mutationSignUp = useMutationSignUp();
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const acct: Credential = {
      username,
      password,
    };
    const player = await mutationSignUp.mutateAsync(acct);
    if (player) navigate("/login");
  };

  return (
    <section className="signup-section">
      {" "}
      <div className="upbeat-wrapper">
        <div className="upbeat">
          <form onSubmit={handleSubmit}>
            <div className="from_upbeat">
              <h1 className="text-Upbeat">UPBEAT</h1>
              <h5 className="text-Hope">Hope you enjoy</h5>
              <p></p>
              <div className="NPF">
                <button type="submit">presented by NPF</button>
              </div>
            </div>
          </form>

          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <h1>SIGN UP</h1>
              <h3 className="name">Username</h3>
              <div className="input-box">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FaUserCircle className="icon" />
              </div>
              <h3 className="name">Password</h3>
              <div className="input-box">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>
              <h3 className="name">Confirm Password</h3>
              <div className="input-box">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>
              <div className="container">
                <button type="submit">Sign Up</button>{" "}
              </div>
              <div className="guess">
                <a href="#">Already have an account?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
