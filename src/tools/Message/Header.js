import React, { useContext } from "react";
import { BsPinAngle } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MessageProvider } from "../../context/MessageContext";
import Styles from "../../style/message";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
function Header() {
  let { friend, friendid, friendImage } = useContext(MessageProvider);
  let { userId } = useContext(AuthContext);
  function addfriend() {
    try {
      axios
        .post("http://localhost:5001/message/addfriend", {
          friend,
          friendid,
          friendImage,
          userId,
        })
        .then((res) => {
          if (res.data === "ok") {
            console.log("ok");
          } else if (res.data === "already") {
            console.log("user is already exists");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div style={Styles.HeaderTitle}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          src={
            friendImage
              ? `http://localhost:5001/uploads/${friendImage}`
              : "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
          }
          alt=""
          style={Styles.HeaderImg}
        />
        <span style={Styles.HeaderFriend}>{friend}</span>
      </div>
      <div style={Styles.HeaderName}>
        <BsPinAngle />
        <AiOutlineStar />
        <BiDotsVerticalRounded />
        <span
          style={{ color: "rgb(70, 64, 222)", marginRight: "30px" }}
          onClick={addfriend}
        >
          Add Friend
        </span>
      </div>
    </div>
  );
}

export default Header;
