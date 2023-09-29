import React, { useState, useRef } from "react";
import axios from "axios";
import "../style/register.css";
import Bglogo from "../style/bglogo.svg";
import UploadPhoto from "../style/image-upload.svg";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../style/logo.png";
function Register() {
  const navigateLogin = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileName, setProfileName] = useState("");
  let userImg = useRef();
  const handleRegister = async (e) => {
    e.preventDefault();

    // Create form data to send to the server
    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);
    try {
      // Make a POST request to the backend API
      const response = await axios.post(
        "http://localhost:5001/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Display the response from the server

      if (response.data === "exist") {
        alert("user name is already taken !");
      } else if (response.data === "fine") {
        // Reset the form fields
        setName("");
        setEmail("");
        setPassword("");
        setProfilePicture(null);
        setProfileName("Select Photo");
        navigateLogin("/");
      }
    } catch (error) {
      console.log(error.response.data); // Display the error message from the server
    }
  };

  async function handleProfilePicture(dataImg) {
    let data = await convertBase64(dataImg);
    userImg.current.src = data;
  }
  function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <div className="register-page">
      <header className="header">
        <img src={Logo} style={{ height: "50px", width: "200px" }} />
        <div>
          <Link id="link" to={"/"}>
            <button id="loginr"> Login</button>
          </Link>

          <button id="registerr">Register</button>
        </div>
      </header>
      <h2 id="reg-title">Register Now !</h2>

      <div className="content">
        <form onSubmit={handleRegister}>
          <label htmlFor="name">Enter the Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            required
          />
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
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="photo-con">
            <div>
              <label htmlFor="Uploadphoto">
                <img
                  ref={userImg}
                  src={UploadPhoto}
                  alt="Upload"
                  htmlFor="Uploadphoto"
                  style={{
                    width: "50px",
                    height: "50px",
                    padding: "20px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="Uploadphoto"
                onChange={(e) => {
                  setProfilePicture(e.target.files[0]);
                  setProfileName(e.target.files[0].name);
                  handleProfilePicture(e.target.files[0]);
                }}
                style={{ display: "none" }}
              />
            </div>
            <div className="photo-word">
              <label>Upload the profile picture </label>
              <input
                type="text"
                id="Upload-show"
                disabled="true"
                placeholder="Select Photo"
                value={profileName}
              />
            </div>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>

      <footer className="footer">
        <img src={Bglogo} alt="background logo" width={1000} height={200} />
      </footer>
    </div>
  );
}

export default Register;
