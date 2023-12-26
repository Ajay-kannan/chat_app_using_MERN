import React, { useContext, useEffect, useState } from "react";
import { BsPinAngle } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MessageProvider } from "../../context/MessageContext";
import Styles from "../../style/message";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function Header() {
  let {
    friend,
    friendid,
    friendImage,
    friendRefresh,
    isFriend,
    setIsFriend,
    encrypKey,
    setEncrypKey,
    userList,
  } = useContext(MessageProvider);

  let { userId } = useContext(AuthContext);

  let navigate = useNavigate();

  async function removeFriend() {
    try {
      await axios
        .post("http://localhost:5001/message/removeFriend", {
          userId,
          friendid,
        })
        .then((res) => {
          if (res.data === "done") {
            alert("remove successfully");
            navigate(0);
          } else if (res.data === "already") {
            console.log("user is already exists");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  async function addfriend() {
    const uuidFromUuidV4 = () => {
      const newUuid = uuid();
      return newUuid;
    };

    try {
      await axios
        .post("http://localhost:5001/message/addfriend", {
          friend,
          friendid,
          friendImage,
          userId,
          key: uuidFromUuidV4(),
        })
        .then((res) => {
          if (res.data === "ok") {
            navigate(0);
          } else if (res.data === "already") {
            console.log("user is already exists");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function a() {
      console.log("obj obj");
      setIsFriend(false);
      try {
        await axios
          .post("http://localhost:5001/message/findFriend", {
            userId,
            friendid,
          })
          .then((res) => {
            if (res.data === "none") {
              setIsFriend(true);
            } else if (res.data === "already") {
              console.log("user is already exists");
            }
          });
      } catch (err) {
        console.log(err);
      }
    }

    a();

    if (encrypKey == "null") {
      let getkey = userList.find((obj) => obj["friendid"] === friendid);
      if (getkey) setEncrypKey(getkey.key);
      else alert("add friend");
    }
  }, [friendRefresh]);

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

        {!isFriend ? (
          <span
            style={{ color: "red", marginRight: "30px" }}
            onClick={removeFriend}
          >
            Remove Friend
          </span>
        ) : (
          <span
            style={{ color: "rgb(70, 64, 222)", marginRight: "30px" }}
            onClick={addfriend}
          >
            Add Friend
          </span>
        )}
      </div>
    </div>
  );
}

export default Header;
