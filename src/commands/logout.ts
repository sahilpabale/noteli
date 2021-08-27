import Command from "@oclif/command";
import axios from "axios";
import chalk = require("chalk");
import TokenConfig from "../utils/TokenConfig";

const api = "https://noteli-api.sahilpabale.me/api";

export class Logout extends Command {
  static description = `logout the user from noteli
Revokes the token and logs out user from system.`;

  async run() {
    try {
      // call logout api
      await axios.get(`${api}/logout`);
      // remove token
      await new TokenConfig().revokeToken(this.config.windows);
      this.log("To use Noteli again run " + chalk.greenBright("$ noteli auth"));
    } catch (error) {
      this.log(error);
    }
  }
}
