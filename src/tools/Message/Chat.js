import React, { useContext } from "react";
import Header from "./Header";
import ChatMessages from "./ChatMessages";
import Input from "./Input";
import { MessageProvider } from "../../context/MessageContext";
import Group from "./Group";
function Chat() {
  const { isGroup } = useContext(MessageProvider);
  return (
    <div style={{ width: "78%", height: "99%" }}>
      {isGroup ? (
        <Group />
      ) : (
        <>
          <Header />
          <ChatMessages />
          <Input />
        </>
      )}
    </div>
  );
}

export default Chat;
