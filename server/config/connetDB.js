let mongoose = require("mongoose");

// connecting to mongodb atlas by mongoose connection.

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    let connect = await mongoose.connect(
      process.env.CONNECTION_STRING,
      connectionParams
    );
    console.log(
      "database is connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (e) {
    console.log("error : ", e);
    process.exit(1);
  }
};

module.exports = connectDB;
