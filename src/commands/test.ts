import Command from "@oclif/command";
import TokenConfig from "../utils/TokenConfig";
import * as chalk from "chalk";

const tokenConfig = new TokenConfig();

export class Test extends Command {
  async run() {
    try {
      await tokenConfig.setToken("mhm", this.config.windows);
      const token = await tokenConfig.getToken(this.config.windows);
      if (typeof token == "string") {
        this.log(token);
      } else {
        throw new Error(token);
      }
    } catch (error) {
      this.log(chalk.red(`\n  ${error.message}`));
    }
  }
}
