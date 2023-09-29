const express = require("express");
const route = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const fs = require("fs");
// const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for each uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

// File filter to accept only specific file types (e.g., images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};
// Set up Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

route.post(
  "/register",
  upload.single("profilePicture"),
  asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    const profilePicture = req.file;
    if (!username || !email || !password) {
      res.status(201).json("exist");
      throw new Error("All field are mandatory !");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(201).json("exist");
      throw new Error("User already registered");
    }

    // encryption the password
    const hashPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      username,
      email,
      password: hashPassword,
      userImage: {
        data: profilePicture.filename,
        contentType: profilePicture.mimetype,
      },
    });
    console.log(user);
    if (user) {
      res.status(201).json("fine");
    } else {
      res.status(400);
      throw new Error("User data is not vaild");
    }
    res.status(200).json({ message: "ok fine" });
  })
);

// login the user and get the access token for authorization to have the header as bearer

route.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // create a access token and return back
      // const accessToken = jwt.sign(
      //   {
      //     user: {
      //       username: user.username,
      //       email: user.email,
      //       id: user.id,
      //     },
      //   },
      //   process.env.ACCESS_TOKEN_SECERT,
      //   { expiresIn: "15m" }
      // );
      res.status(200).json({ status: "ok", username: user });
    } else {
      res.status(201).json("invalid");
      throw new Error("email or password is not valid");
    }
  })
);

// route.get(
//   "/userid",
//   asyncHandler(async (req, res) => {
//     console.log("came");
//     res.status(200).json(req.user);
//   })
// );

module.exports = route;
