import React, { useState, useContext } from "react";
import Search from "./Search";
import Chats from "./Chats";
import { BiSearch } from "react-icons/bi";
import Styles from "../../style/message";
import { MessageProvider } from "../../context/MessageContext";

function GroupChat() {
  const { setIsGroup, isGroup, groupCode, setGroupCode } =
    useContext(MessageProvider);
  function handleSubmit() {
    setIsGroup(true);
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3 style={{ padding: "5px" }}>create Group Chat</h3>
      <div style={Styles.SearchField}>
        <div style={Styles.SearchBorder}>
          <BiSearch style={Styles.SearchIcon} />
          <input
            value={groupCode}
            onChange={(e) => {
              setGroupCode(e.target.value);
            }}
            style={Styles.SearchInput}
            placeholder="group ID"
          />
        </div>
      </div>
      <button
        style={{
          margin: "20px",
          padding: "7px 10px",
          textDecoration: "none",
          border: "none",
          color: "white",
          background: "#4640de",
          borderRadius: "3px",
        }}
        onClick={handleSubmit}
      >
        Join
      </button>
    </div>
  );
}

function Sidebar() {
  const sidebar = {
    width: "20%",
    height: "100%",
    borderRight: "2px solid rgb(214, 221, 235)",
  };
  return (
    <div style={sidebar}>
      <Search />
      <Chats />
      <GroupChat />
    </div>
  );
}

export default Sidebar;
