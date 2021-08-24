import Command from "@oclif/command";
import * as chalk from "chalk";
import TokenConfig from "../utils/TokenConfig";
import ux from "cli-ux";

export class Whoami extends Command {
  async run() {
    ux.action.start(chalk.yellow("Fetching your account"), "loading");

    try {
      const tokenConfig = new TokenConfig();

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
