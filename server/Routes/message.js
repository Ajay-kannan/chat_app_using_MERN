const express = require("express");
const route = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Message = require("../model/messageModel");
const Userfriend = require("../model/userList");
var ObjectId = require("mongoose").Types.ObjectId;
route.get(
  "/userlist",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    let userlistnew = [];
    users.map((item, index) => {
      let userlistobj = {
        name: item.username,
        userid: item._id,
        userImage: item.userImage.data,
      };
      userlistnew.push(userlistobj);
    });
    res.json(userlistnew);
  })
);

route.post("/message", async (req, res) => {
  try {
    // Create a new message
    const message = await Message.create({
      senderId: req.body.userId,
      receiverId: req.body.friendid,
      content: req.body.inputMessage,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: "Failed to create message" });
  }
});

route.post("/addfriend", async (req, res) => {
  try {
    let user = await Userfriend.findOne({
      userid: req.body.userId,
      friendid: req.body.friendid,
    });
    let data = {
      username: req.body.friend,
      userid: req.body.userId,
      userImage: req.body.friendImage,
      friendid: req.body.friendid,
    };
    if (user) {
      res.json("already");
    } else {
      Userfriend.create(data);
      res.json("success");
    }
  } catch {}
});

route.post("/messages", async (req, res) => {
  try {
    let userchat = await Message.find({
      $or: [
        {
          senderId: new ObjectId(req.body.userId),
          receiverId: new ObjectId(req.body.friendid),
        },
        {
          senderId: new ObjectId(req.body.friendid),
          receiverId: new ObjectId(req.body.userId),
        },
      ],
    });

    if (userchat) {
      res.json(userchat);
    } else {
      res.json("new");
    }
  } catch (err) {
    res.status(400).json("error");
  }
});

route.post("/userfriend", async (req, res) => {
  try {
    let getuser = await Userfriend.find({
      userid: new ObjectId(req.body.userId),
    });
    res.json(getuser);
  } catch (error) {
    res.status(400).json("error");
  }
});

module.exports = route;
