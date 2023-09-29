import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../tools/Message/Sidebar";
import Chat from "../tools/Message/Chat";
import axios from "axios";
import { MessageProvider } from "../context/MessageContext";
import { AuthContext } from "../context/AuthProvider";
import Logo from "../style/logo.png";

function Message() {
  let { setFriend, setFriendId, setFriendImage, getUserList } =
    useContext(MessageProvider);

  let { userId } = useContext(AuthContext);

  let { setUserName, setUserId, setUserEmail, setUserImage } =
    useContext(AuthContext);

  let [loading, setLoading] = useState(true);

  let userid = useRef("");

  useEffect(() => {
    async function func() {
      setUserName(localStorage.getItem("userName"));
      setUserId(localStorage.getItem("userId"));
      setUserEmail(localStorage.getItem("userEmail"));
      setUserImage(localStorage.getItem("userImage"));
      userid.current = localStorage.getItem("userId");
      funcUser();
    }

    async function funcUser() {
      try {
        await axios
          .post("http://localhost:5001/message/userfriend", {
            userId: userid.current,
          })
          .then((json) => {
            let result = [];
            json.data.forEach((user) => {
              result.push({
                friend: user.username,
                friendid: user.friendid,
                friendImage: user.userImage,
              });
            });
            getUserList(result);
            setFriend(result[0].friend);
            setFriendId(result[0].friendid);
            setFriendImage(result[0].friendImage);
            setLoading(false);
          });
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    func();
  }, []);

  // useEffect(() => {
  //   if (refOnce1.current) func();
  //   else {
  //     refOnce1.current = true;
  //   }
  // }, []);
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
          }}
        >
          <h1
            style={{
              height: "100%",
              display: "grid",
              placeItems: "center",
              width: "20%",
              fontFamily: "monospace",
            }}
          >
            <img src={Logo} style={{ height: "50px", width: "200px" }} />
          </h1>
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
