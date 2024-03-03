import React from "react";
import "./login.css";
import { FaUserCircle, FaLock } from "react-icons/fa";

function singup() {
  return (
    <section>
      <div className="upbeat-wrapper">
        <div className="upbeat">
          <form action="">
            <div className="from_upbeat">
              <h1 className="text-Upbeat">UPBEAT</h1>
              <h5 className="text-Hope">Hope you enjoy</h5>
              <p> </p>
              <div className="NPF">
                <button type="submit">presented by NPF</button>
              </div>
            </div>
          </form>

          <div className="wrapper">
            <form action="">
              <h1>SIGN UP</h1>
              <h3 className="name">username</h3>
              <div className="input-box">
                <input type="text" required />
                <FaUserCircle className="icon" />
              </div>
              <h3 className="name">password</h3>
              <div className="input-box">
                <input type="password" required />
                <FaLock className="icon" />
              </div>
              <h3 className="name">comfrim password</h3>
              <div className="input-box">
                <input type="password" required />
                <FaLock className="icon" />
              </div>
              <div className="container">
                <button type="submit">Login</button>
                <button type="submit">Sign up</button>
              </div>
              <div className="guess">
                <a href="#">already have account ?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default singup;
