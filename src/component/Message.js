import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../tools/Message/Sidebar";
import Chat from "../tools/Message/Chat";
import { AuthContext } from "../context/AuthProvider";
import Logo from "../style/logo.png";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Message() {
  let { setUserName, setUserId, setUserEmail, setUserImage } =
    useContext(AuthContext);

  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function func() {
      setUserName(localStorage.getItem("userName"));
      setUserId(localStorage.getItem("userId"));
      setUserEmail(localStorage.getItem("userEmail"));
      setUserImage(localStorage.getItem("userImage"));
      setLoading(false);
    }

    func();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userEmail");
    navigate("/login", { replace: true });
  };

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            height: "9%",
            width: "98%",
            border: "2px solid rgb(214, 221, 235)",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <img src={Logo} style={{ height: "50px", width: "200px" }} />
          <div
            style={{
              display: "grid",
              alignItems: "center",
              color: "red",
            }}
          >
            <span
              style={{
                border: "1px solid red",
                padding: "5px",
                borderRadius: "15%",
              }}
              onClick={handleLogOut}
            >
              {" "}
              <CiLogin /> log out
            </span>
          </div>
        </div>
        {loading ? (
          "loading..."
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "90%",
            }}
          >
            <Sidebar />
            <Chat />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Message;
