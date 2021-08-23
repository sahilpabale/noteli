import * as mongoose from "mongoose";
let config = require("../config");

const uri = config.mongo_uri;

(async function () {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      ssl: true,
    });
  } catch (error) {
    console.error(new Error("Failed to connect to the server!"));
  }
})();
