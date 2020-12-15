const mongoose = require("mongoose");
const keys = require("./keys");
// connect to mongoose
mongoose.connect(
  keys.mongodb.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("mongodb connected");
  }
);