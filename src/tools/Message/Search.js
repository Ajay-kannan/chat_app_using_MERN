import React, { useContext } from "react";
import { MessageProvider } from "../../context/MessageContext";
import axios from "axios";
import Styles from "../../style/message";
import { BiSearch } from "react-icons/bi";
const Searchresult = () => {
  let {
    result,
    setUserSearch,
    setResult,
    setFriend,
    setFriendId,
    setFriendImage,
    setFriendRefresh,
    friendRefresh,
    setMessageLoading,
    setEncrypKey,
  } = useContext(MessageProvider);

  // const overlay = ;
  return (
    <div
      className="userChat"
      style={{
        position: "fixed",
        background: "white",
        width: "20%",
        cursor: "pointer",
      }}
    >
      {result.map((result, id) => {
        return (
          <div
            style={{ border: "2px solid rgb(214, 221, 235)", padding: "2px" }}
            key={id}
            className="userChatInfo"
            onClick={() => {
              setUserSearch("");
              setResult([]);
              setFriend(result.name);
              setFriendId(result.userid);
              setFriendImage(result.userImage);
              setFriendRefresh(!friendRefresh);
              setMessageLoading(true);
              setEncrypKey("null");
            }}
          >
            <span>{result.name}</span>
          </div>
        );
      })}
    </div>
  );
};

function Search() {
  const { userSearch, setUserSearch, setResult } = useContext(MessageProvider);

  async function fetchData(text) {
    try {
      await axios.get("http://localhost:5001/message/userlist").then((json) => {
        const result = json.data.filter((user) => {
          return (
            text && user && user.name && user.name.toLowerCase().includes(text)
          );
        });
        setResult(result);
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <React.Fragment>
      <div style={Styles.SearchField}>
        <div style={Styles.SearchBorder}>
          <BiSearch style={Styles.SearchIcon} />
          <input
            value={userSearch}
            onChange={(e) => {
              setUserSearch(e.target.value);
              fetchData(e.target.value);
            }}
            style={Styles.SearchInput}
            placeholder="find a user"
          />
        </div>
      </div>

      <Searchresult />
    </React.Fragment>
  );
}

export default Search;
