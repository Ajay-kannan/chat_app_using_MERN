import React, { useContext, useEffect } from "react";
import Header from "./Header";
import ChatMessages from "./ChatMessages";
import Input from "./Input";
import { MessageProvider } from "../../context/MessageContext";
import Group from "./Group";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
function Chat() {
  const { isGroup, messageLoading } = useContext(MessageProvider);

  let {
    setFriend,
    setFriendId,
    setFriendImage,
    setMessageLoading,
    setEncrypKey,
  } = useContext(MessageProvider);

  let { userId } = useContext(AuthContext);

  const StartingLoading = () => {
    useEffect(() => {
      async function funcUser() {
        try {
          await axios
            .post("http://localhost:5001/message/userfriend", {
              userId: userId,
            })
            .then((json) => {
              let result = [];
              json.data.forEach((user) => {
                result.push({
                  friend: user.username,
                  friendid: user.friendid,
                  friendImage: user.userImage,
                  key: user.key,
                });
              });
              setFriend(result[0].friend);
              setFriendId(result[0].friendid);
              setFriendImage(result[0].friendImage);
              setEncrypKey(result[0].key);
              setMessageLoading(true);
            });
        } catch (err) {
          console.log(err);
        }
      }

      funcUser();
    }, []);

    return <>loading...</>;
  };

  return (
    <div className="message-body">
      {isGroup ? (
        <Group />
      ) : (
        <>
          {!messageLoading ? (
            <StartingLoading />
          ) : (
            <>
              <Header />
              <ChatMessages />
              <Input />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Chat;
