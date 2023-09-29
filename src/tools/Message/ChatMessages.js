import React, { useContext, useEffect, useRef } from "react";
import { MessageProvider } from "../../context/MessageContext";
import { AuthContext } from "../../context/AuthProvider";
import Message from "./Message";
import Styles from "../../style/message";
import axios from "axios";

function ChatMessages() {
  let {
    friend,
    friendid,
    friendImage,
    setMessage,
    message,
    setFriend,
    sendMsg,
  } = useContext(MessageProvider);
  let { userId } = useContext(AuthContext);
  let scrollRef = useRef();
  useEffect(() => {
    async function func() {
      try {
        await axios
          .post("http://localhost:5001/message/messages", { userId, friendid })
          .then((res) => {
            if (res.data === "new") {
              setMessage([]);
            } else {
              setMessage(res.data);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
    func();
  }, [friend]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div style={Styles.chatmessages}>
      {message?.map((val, index) => {
        return (
          <div ref={scrollRef} key={index}>
            {" "}
            <Message messageData={val} />{" "}
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
