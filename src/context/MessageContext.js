import React, { createContext, useState } from "react";
export const MessageProvider = createContext();

function MessageContext({ children }) {
  const [userSearch, setUserSearch] = useState("");
  const [result, setResult] = useState([]);
  const [userList, getUserList] = useState([]);
  const [friend, setFriend] = useState("");
  const [friendid, setFriendId] = useState("");
  const [message, setMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [friendImage, setFriendImage] = useState("");
  const [sendMsg, setSendMsg] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [groupCode, setGroupCode] = useState("");
  return (
    <MessageProvider.Provider
      value={{
        userSearch,
        setUserSearch,
        result,
        setResult,
        userList,
        getUserList,
        inputMessage,
        setInputMessage,
        friend,
        setFriend,
        friendid,
        setFriendId,
        message,
        setMessage,
        friendImage,
        setFriendImage,
        sendMsg,
        setSendMsg,
        isGroup,
        setIsGroup,
        groupCode,
        setGroupCode,
      }}
    >
      {children}
    </MessageProvider.Provider>
  );
}

export default MessageContext;
