import Command from "@oclif/command";
import axios from "axios";
import chalk = require("chalk");
import pingServer from "../utils/pingServer";
import TokenConfig from "../utils/TokenConfig";

const api = "https://noteli-api.sahilpabale.me/api";

export class Logout extends Command {
  static description = `logout the user from noteli
Revokes the token and logs out user from system.`;

  async init() {
    if (!(await pingServer())) {
      this.warn("We are having some server issues! Just hold on!");
      this.exit(0);
    }
  }

  async run() {
    try {
      // call logout api
      await axios.get(`${api}/logout`);
      // remove token
      await new TokenConfig().revokeToken(this.config.windows);
      this.log(
        "To use Noteli again run " + chalk.greenBright("$ noteli login")
      );
    } catch (error) {
      if (error.response == undefined) {
        this.warn("We are having some server issues! Just hold on!");
        this.exit(0);
      }
      this.log(error);
    }
  }
}
