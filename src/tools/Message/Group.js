import React, { useEffect, useRef, useState, useContext } from "react";
import Styles from "../../style/message";
import io from "socket.io-client";
import { AuthContext } from "../../context/AuthProvider";
import { MessageProvider } from "../../context/MessageContext";

function Header() {
  const { setIsGroup } = useContext(MessageProvider);
  function handleSubmit() {
    setIsGroup(false);
  }
  return (
    <div style={Styles.HeaderTitle}>
      <div style={Styles.HeaderName}>Group Chat</div>
      <div
        onClick={handleSubmit}
        style={{ marginRight: "20px", color: "#f44336", cursor: "pointer" }}
      >
        Leave Chat
      </div>
    </div>
  );
}

const ENDPOINT = "http://localhost:5001";
var socket;

function ChatMessages({ message, setMessage }) {
  let { userName } = useContext(AuthContext);
  let { groupCode, isGroup } = useContext(MessageProvider);
  let scrollRef = useRef();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", groupCode, userName);
    socket.on("connected", () => {
      console.log("connected");
    });
  }, [isGroup]);

  useEffect(() => {
    socket.on("receive-message", (messag, sender) => {
      let obj = { name: sender, message: messag };
      if (JSON.stringify(obj) != "") setMessage([...message, obj]);
    });
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div style={Styles.chatmessages}>
      <div className="messageContent">
        {message.map((val, index) => {
          return (
            <p
              ref={scrollRef}
              key={index}
              style={{ backgroundColor: "#8da4f1" }}
            >
              {val.name}
              <br />
              {val.message}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function Input({ input, setInput, message, setMessage }) {
  const { userName } = useContext(AuthContext);
  let { groupCode } = useContext(MessageProvider);

  function handleSendMessage(e) {
    e.preventDefault();
    socket.emit("message", input, userName, groupCode);
    let obj = { name: userName, message: input };
    if (JSON.stringify(obj) != "") setMessage([...message, obj]);
    setInput("");
  }
  return (
    <div style={Styles.InputField}>
      <form onSubmit={handleSendMessage} style={Styles.InputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          name="message"
          placeholder="Type something..."
          style={{ height: "50px", width: "100%", flex: "70%" }}
        />
        <div style={Styles.InputRight}>
          <input type="file" style={{ display: "none" }} name="" id="file" />
          <label htmlFor="file">
            <img
              src="https://raw.githubusercontent.com/safak/youtube2022/react-chat/src/img/attach.png"
              alt=""
            />
          </label>
          <button style={{ width: "80%" }}>send</button>
        </div>
      </form>
    </div>
  );
}

function Group() {
  const [input, setInput] = useState("");
  let [message, setMessage] = useState([]);
  return (
    <>
      <Header />
      <ChatMessages message={message} setMessage={setMessage} />
      <Input
        input={input}
        setInput={setInput}
        message={message}
        setMessage={setMessage}
      />
    </>
  );
}

export default Group;
