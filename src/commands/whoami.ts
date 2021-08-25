import Command from "@oclif/command";
import * as chalk from "chalk";
import TokenConfig from "../utils/TokenConfig";
import ux from "cli-ux";
const figchalk = require("figchalk");

const tokenConfig = new TokenConfig();

export class Whoami extends Command {
  async run() {
    this.log(process.env.TEST);

    console.log(figchalk.mix("N o t e l i", "redBright"));

    ux.action.start(chalk.yellow("Fetching your account"), "loading");

    try {
      const token = await tokenConfig.getToken(this.config.windows);

      const user = await tokenConfig.getUser(token);

      ux.action.stop(
        `\nYou are logged in as ${chalk.greenBright(
          user.name + " - " + user.email
        )}`
      );
    } catch (error) {
      this.log(chalk.red("Failed to authorize user :("));
      this.log(error);
    }
  }
}
