import React, { useContext, useEffect } from "react";
import { MessageProvider } from "../../context/MessageContext";
import Styles from "../../style/message";
import "../../style/sidebar.css";
const Chatfriends = ({ username }) => {
  let { setFriend, setFriendId, setFriendImage } = useContext(MessageProvider);
  return (
    <React.Fragment>
      <div
        onClick={(e) => {
          setFriend(username.friend);
          setFriendId(username.friendid);
          setFriendImage(username.friendImage);
        }}
        style={Styles.chatFriend}
        className="chatFriendHover"
      >
        <div style={{ flex: "30%", display: "grid", placeItems: "center" }}>
          <img
            src={
              username.friendImage
                ? `http://localhost:5001/uploads/${username.friendImage}`
                : "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
            }
            alt=""
            style={Styles.chatCard}
          />
        </div>
        <div style={{ flex: "70%", display: "flex", alignItems: "center" }}>
          <span style={{ paddingLeft: "10px" }}>{username.friend}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

function Chats() {
  let { userList } = useContext(MessageProvider);

  return (
    <div className="chats" style={{ height: "400px", overflow: "scroll" }}>
      {userList.map((item, index) => {
        return <Chatfriends username={item} key={index} />;
      })}
    </div>
  );
}

export default Chats;
