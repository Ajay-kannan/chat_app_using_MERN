import React, { useState, useContext } from "react";
import axios from "axios";
import "../style/login.css";
import BgLogo from "../style/bgLogin.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Logo from "../style/logo.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useContext(AuthContext);
  let navigateDash = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API for login
      const response = await axios.post("http://localhost:5001/users/login", {
        email,
        password,
      });

      // Display the response from the server
      if (response.data.status === "ok") {
        localStorage.setItem("userName", response.data.username.username);
        localStorage.setItem("userEmail", response.data.username.email);
        localStorage.setItem("userId", response.data.username._id);
        localStorage.setItem(
          "userImage",
          response.data.username.userImage.data
        );
        setUserId(response.data.username._id);
        navigateDash("/dashboard", { state: { access: "ok" } });
      } else if (response.data === "invalid") {
        alert("invalid users");
      }
      // Reset the form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.response.data); // Display the error message from the server
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <img src={Logo} style={{ height: "50px", width: "200px" }} />
        <div>
          <button id="loginl">Login</button>
          <Link to={"/register"}>
            <button id="registerl">Register</button>
          </Link>
        </div>
      </header>
      <div className="content">
        <h2>Welcome back!</h2>
        <p>Please log in to your account.</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Enter the email </label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Enter the password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log In</button>
        </form>
      </div>

      <footer className="footer">
        <img src={BgLogo} alt="background logo" width="500" height="300" />
      </footer>
    </div>
  );
}

export default Login;
