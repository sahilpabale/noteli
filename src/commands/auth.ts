import Command from "@oclif/command";
import * as chalk from "chalk";
import * as inquirer from "inquirer";
import axios from "axios";
import * as express from "express";
import { Application, Request, Response } from "express";
import * as open from "open";
import TokenConfig from "../utils/TokenConfig";
const figchalk = require("figchalk");

const tokenConfig = new TokenConfig();
const api = "https://noteli-api.sahilpabale.me/api";

export class Auth extends Command {
  static description = `authorize the user for noteli
Uses Auth0 Social Login to authorize user using browser.`;

  private async authorize() {
    inquirer
      .prompt({
        name: "authorize",
        type: "confirm",
        message: "Would you like us to open browser for authentication?",
        default: true,
      })
      .then(async (answer) => {
        if (answer.authorize) {
          // open browser and authorize!
          try {
            const app: Application = express();

            app.use(express.json());
            app.use(express.urlencoded({ extended: false }));

            const server = app.listen(9991);

            let resolve: any;

            const p = new Promise((_resolve) => {
              resolve = _resolve;
            });

            const authAPI = await axios.post(`${api}/authorize`);

            app.get("/callback", (req: Request, res: Response) => {
              resolve(req.query.code);
              res.redirect("https://noteli-client.vercel.app/done");
            });

            const authUrl = authAPI.data["url"];

            open(authUrl);

            // Wait for the first auth code
            const code = await p;

            const response = await axios.post(`${api}/token`, { code });

            const access_token = response.data.token;

            await tokenConfig.setToken(access_token, this.config.windows);

            server.close();
            const user = await tokenConfig.getUser(access_token);
            this.log(
              "Logged in successfully as " + chalk.greenBright(user.email)
            );
            process.exit(0);
          } catch (error) {
            this.log(error.response);
          }
        } else {
          this.log(
            chalk.yellow(
              "\nIf you're not authorized,\nYou won't be able to use Noteli."
            )
          );
        }
      })
      .catch((err) => this.log(err));
  }
  async run() {
    tokenConfig
      .getToken(this.config.windows)
      .then(async (token) => {
        if (token == "") {
          await this.authorize();
        } else {
          tokenConfig
            .getUser(token)
            .then(async (user) => {
              if (user != null) {
                this.log(chalk.yellow("An account already exists!"));
                this.log("Logged in as " + chalk.greenBright(user.email));
              } else {
                await this.authorize();
              }
            })
            .catch(async (err) => {
              await this.authorize();
            });
        }
      })
      .catch(async (err) => {
        await this.authorize();
      });
  }
}
