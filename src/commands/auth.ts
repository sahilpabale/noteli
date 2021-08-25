import Command from "@oclif/command";
import * as chalk from "chalk";
import * as inquirer from "inquirer";
import axios from "axios";
import * as express from "express";
import { Application, Request, Response } from "express";
import * as open from "open";
import TokenConfig from "../utils/TokenConfig";
import { getConfig } from "../utils/Config";
const figchalk = require("figchalk");

const tokenConfig = new TokenConfig();

export class Auth extends Command {
  configData: any = {};

  async init() {}

  async authorize() {
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

            const server = await app.listen(3000);

            let resolve: any;

            const p = new Promise((_resolve) => {
              resolve = _resolve;
            });

            app.get("/callback", (req: Request, res: Response) => {
              resolve(req.query.code);
              res.redirect("done");
            });

            app.get("/done", (req: Request, res: Response) => {
              res.send(
                "Successfully authorized!<br/>Now you can close this browser and return to CLI!"
              );
            });

            await open(
              `${this.configData.issuerBaseURL}/authorize?response_type=code&client_id=${this.configData.clientID}&redirect_uri=${this.configData.baseURL}/callback&scope=openid%20profile%20email&state=testing`
            );
            // Wait for the first auth code
            const code = await p;

            const response = await axios.post(
              `${this.configData.issuerBaseURL}/oauth/token`,
              `grant_type=authorization_code&client_id=${this.configData.clientID}&client_secret=${this.configData.clientSecret}&code=${code}&redirect_uri=${this.configData.baseURL}/callback`
            );

            const access_token = response.data["access_token"];

            await tokenConfig.setToken(access_token, this.config.windows);

            await server.close();
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
    console.log(figchalk.mix("N o t e l i", "redBright"));

    // Initialization step to load configs and etc
    this.configData = await getConfig();

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
