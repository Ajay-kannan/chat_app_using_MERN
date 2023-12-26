import React, { useContext } from "react";
import { MessageProvider } from "../../context/MessageContext";
import { AuthContext } from "../../context/AuthProvider";
import Styles from "../../style/message";
import axios from "axios";
import { DoEncrypt } from "../../context/aes";

function Input() {
  let {
    friendid,
    inputMessage,
    setInputMessage,
    sendMsg,
    setSendMsg,
    isFriend,
    encrypKey,
  } = useContext(MessageProvider);
  let { userId } = useContext(AuthContext);
  async function handleSubmit(event) {
    event.preventDefault();
    if (isFriend) {
      alert("add friend first !");
      return;
    }
    if (inputMessage !== "") {
      try {
        await axios
          .post("http://localhost:5001/message/message", {
            friendid,
            inputMessage: DoEncrypt(inputMessage, encrypKey),
            userId,
          })
          .then((res) => {
            console.log(res);
            setInputMessage("");
            setSendMsg(!sendMsg);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div style={Styles.InputField}>
      <form onSubmit={handleSubmit} style={Styles.InputForm}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
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
          <button type="submit" style={{ width: "80%" }}>
            send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Input;
