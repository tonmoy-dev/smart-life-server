const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
