import Command from "@oclif/command";
import axios from "axios";
import chalk = require("chalk");
import open = require("open");
import pingServer from "../utils/pingServer";
import TokenConfig from "../utils/TokenConfig";

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
      open(
        `https://sahilpabale.us.auth0.com/v2/logout?client_id=lkQ1zyXdfFwI8019STfP259Jb37IoaI7`
      );

      // remove token
      new TokenConfig()
        .revokeToken(this.config.windows)
        .then(() => {
          this.log(
            "\nTo use Noteli again run " + chalk.greenBright("$ noteli login")
          );
        })
        .catch((error) => {
          this.log(error);
        });
    } catch (error) {
      this.log(error);
    }
  }
}
