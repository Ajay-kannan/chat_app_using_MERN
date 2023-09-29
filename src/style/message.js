const Styles = {
  chatmessages: {
    height: "77%",
    width: "100%",
    backgroundColor: "aliceblue",
    borderRight: "2px solid rgb(214, 221, 235)",
    overflow: "scroll",
  },
  chatFriend: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    height: "70px",
    borderBottom: "2px solid rgb(214, 221, 235)",
    cursor: "pointer",
    padding: "5px",
  },

  chatCard: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  HeaderTitle: {
    height: "80px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid rgb(214, 221, 235)",
    borderRight: "2px solid rgb(214, 221, 235)",
  },
  HeaderImg: {
    marginLeft: "10px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  HeaderName: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    alignItems: "center",
  },
  HeaderFriend: {
    marginLeft: "30px",
    display: "grid",
    placeItems: "center",
  },
  InputField: {
    height: "11%",
    width: "100%",
    borderTop: "2px solid rgb(214, 221, 235)",
    borderBottom: "2px solid rgb(214, 221, 235)",
    borderRight: "2px solid rgb(214, 221, 235)",
  },
  InputForm: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  InputRight: {
    flex: "30%",
    height: "80px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  SearchField: {
    display: "grid",
    placeItems: "center",
    height: "15%",
    width: "100%",
  },
  SearchBorder: {
    width: "80%",
    height: "35px",
    border: "2px solid rgb(214, 221, 235)",
    display: "flex",
    flexDirection: "row",
  },
  SearchIcon: {
    flex: "25%",
    display: "grid",
    placeItems: "center",
    height: "80%",
    width: "80%",
    color: "rgb(214, 221, 235)",
    marginTop: "5px",
  },
  SearchInput: {
    border: "none",
    flex: "75%",
    width: "100%",
    height: "100%",
  },
};

export default Styles;
