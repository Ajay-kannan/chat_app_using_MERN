import React, { useContext } from "react";
import { MessageProvider } from "../../context/MessageContext";
import { AuthContext } from "../../context/AuthProvider";
const Message = ({ messageData }) => {
  let { userId, userImage } = useContext(AuthContext);
  let { friendImage } = useContext(MessageProvider);
  const styleChange = userId === messageData.senderId ? "owner" : "messages";
  return (
    <div className={styleChange}>
      <div className="messageInfo">
        <img
          src={
            styleChange != "owner"
              ? `http://localhost:5001/uploads/${friendImage}`
              : `http://localhost:5001/uploads/${userImage}`
          }
          alt=""
        />
        {/* <span>{date}</span>
        <span>{time}</span> */}
      </div>
      <div className="messageContent">
        <p>{messageData.content}</p>
      </div>
    </div>
  );
};

export default Message;
