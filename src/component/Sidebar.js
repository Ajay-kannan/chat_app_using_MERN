import React, { useContext } from "react";
import "../style/sidebar.css";
import { SidebarData } from "../context/SidebarData";
import { AuthContext } from "../context/AuthProvider";
function Sidebar() {
  const { position, setPosition } = useContext(AuthContext);
  return (
    <div className="Sidebar">
      {
        <ul className="sidebarList">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                onClick={() => {
                  setPosition(val.title);
                }}
                className="row"
                id={position === val.title ? "active" : ""}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
}

export default Sidebar;
