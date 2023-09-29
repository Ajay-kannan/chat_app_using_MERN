var mongoose = require("mongoose");

var userlist = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  userImage: {
    type: String,
  },
  friendid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("userFriend", userlist);
