import Command from "@oclif/command";
import * as chalk from "chalk";
import TokenConfig from "../utils/TokenConfig";

export class WhoAmI extends Command {
  async run() {
    this.log(chalk.yellow("Loading your account..."));

    try {
      const tokenConfig = new TokenConfig();

      const token = await tokenConfig.getToken(this.config.windows);

      const user = await tokenConfig.getUser(token);

      this.log(
        `You are logged in as ${chalk.greenBright(
          user.name + " - " + user.email
        )}`
      );
    } catch (error) {
      this.log(chalk.red("Failed to authorize user :("));
      this.log(error);
    }
  }
}
