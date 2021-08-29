import Command from "@oclif/command";
import * as chalk from "chalk";
import TokenConfig from "../utils/TokenConfig";
import ux from "cli-ux";
import pingServer from "../utils/pingServer";

const tokenConfig = new TokenConfig();

export class Whoami extends Command {
  static description = `shows the current logged-in user
Checks for the token and verifies with Auth0 for authencticity.`;

  async init() {
    if (!(await pingServer())) {
      this.warn("We are having some server issues! Just hold on!");
      this.exit(0);
    }
  }

  async run() {
    try {
      tokenConfig
        .getToken(this.config.windows)
        .then(async (data) => {
          if (data.token == null) {
            this.log(
              `${chalk.yellowBright(
                "You aren't authorized yet!"
              )}\nJust use ${chalk.greenBright("$ noteli login")} to login.`
            );
          } else {
            ux.action.start(chalk.yellow("Fetching your account"), "loading");
            tokenConfig
              .getUser(data.token)
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
                    )}\nJust use ${chalk.greenBright(
                      "$ noteli login"
                    )} to login.`
                  );
                }
              })
              .catch(async (err) => {
                this.log(
                  `${chalk.yellowBright(
                    "You aren't authorized yet!"
                  )}\nJust use ${chalk.greenBright("$ noteli login")} to login.`
                );
              });
          }
        })
        .catch(async (err) => {
          this.log(
            `${chalk.yellowBright(
              "You aren't authorized yet!"
            )}\nJust use ${chalk.greenBright("$ noteli login")} to login.`
          );
        });
    } catch (error) {
      this.log(error);
    }
  }
}
