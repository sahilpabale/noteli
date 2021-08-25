import Command from "@oclif/command";
import * as chalk from "chalk";
import TokenConfig from "../utils/TokenConfig";
import ux from "cli-ux";
const figchalk = require("figchalk");

const tokenConfig = new TokenConfig();

export class Whoami extends Command {
  async run() {
    console.log(figchalk.mix("N o t e l i", "redBright"));

    try {
      const token = await tokenConfig.getToken(this.config.windows);

      tokenConfig
        .getToken(this.config.windows)
        .then(async (token) => {
          if (token == null) {
            this.log(
              `${chalk.yellowBright(
                "You aren't authorized yet!"
              )}\nJust use ${chalk.greenBright("noteli auth")} to login.`
            );
          } else {
            ux.action.start(chalk.yellow("Fetching your account"), "loading");
            tokenConfig
              .getUser(token)
              .then(async (user) => {
                if (user != null) {
                  ux.action.stop(
                    `\nYou are logged in as ${chalk.greenBright(
                      user.name + " - " + user.email
                    )}`
                  );
                } else {
                  ux.action.stop(
                    `${chalk.yellowBright(
                      "\nYou aren't authorized yet!"
                    )}\nJust use ${chalk.greenBright("noteli auth")} to login.`
                  );
                }
              })
              .catch(async (err) => {
                this.log(
                  `${chalk.yellowBright(
                    "You aren't authorized yet!"
                  )}\nJust use ${chalk.greenBright("noteli auth")} to login.`
                );
              });
          }
        })
        .catch(async (err) => {
          this.log(
            `${chalk.yellowBright(
              "You aren't authorized yet!"
            )}\nJust use ${chalk.greenBright("noteli auth")} to login.`
          );
        });
    } catch (error) {
      this.log(error);
    }
  }
}
