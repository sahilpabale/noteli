import * as mongoose from "mongoose";

import { getConfig, Config } from "../src/utils/Config";

(async function () {
  try {
    const config = await getConfig();
    const { mongo_uri } = config;
    await mongoose.connect(mongo_uri, {
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
