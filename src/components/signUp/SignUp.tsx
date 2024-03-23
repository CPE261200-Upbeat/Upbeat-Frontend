import { SyntheticEvent, useState } from "react";
import "../login/Login.css";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutationSignUp } from "@/query/game";
import { Credential } from "@/model/credential";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const mutationSignUp = useMutationSignUp();
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!/^[a-zA-Z0-9]{1,6}$/.test(username)) {
      setUsernameError("Username must be 1-6 alphanumeric characters only");
      return;
    } else {
      setUsernameError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }

    const acct: Credential = {
      username,
      password,
    };
    const player = await mutationSignUp.mutateAsync(acct);
    if (player) {
      alert("Sign up successfully");
      navigate("/login");
    } else {
      alert("Username is already taken");
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
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

          <div className="wrapper_Login">
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
                {usernameError && (
                  <p className="error-message">{usernameError}</p>
                )}
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
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
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
                {confirmPasswordError && (
                  <p className="error-message">{confirmPasswordError}</p>
                )}
              </div>
              <div className="container">
                <button type="submit">Sign Up</button>{" "}
              </div>
              <div className="guess">
                <a href="#" onClick={handleGoToLogin}>
                  Already have an account?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
