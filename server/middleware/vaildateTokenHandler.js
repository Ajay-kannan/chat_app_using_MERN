const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// this middle ware is used for vaildate the token of authorization(request send by headers) and setup req.user as data for response
// we use jwt for auth token

const vaildateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authtoken = req.headers.authorization || req.headers.Authorization;
  if (authtoken && authtoken.startsWith("Bearer")) {
    token = authtoken.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decode.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = vaildateToken;
