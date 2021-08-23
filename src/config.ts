const axios = require("axios");
const chalk = require("chalk");
const { writeFile } = require("fs/promises");

// After installing the package, some API calls will take place which will attach config data to the device for future use

const main = async () => {
  try {
    const response = await axios.post(
      "https://configapi.sahilpabale.repl.co/config"
    );

    const data = new Uint8Array(Buffer.from(JSON.stringify(response.data)));

    const writeConfig = await writeFile("config.json", data);

    console.log(chalk.greenBright("successfully added configurations!"));
  } catch (error) {
    console.error(error);
  }
};

main();
