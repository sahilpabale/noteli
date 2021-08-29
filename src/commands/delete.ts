import Command from "@oclif/command";
import axios from "axios";
import chalk = require("chalk");
import pingServer from "../utils/pingServer";
import TokenConfig from "../utils/TokenConfig";

const { api } = require("../../package.json");

export class Delete extends Command {
  static description = `delete your note(s)
You can delete some specific notes if you think they are not worthy.`;

  static usage = ["delete <ID>"];

  static args = [{ name: "id" }];

  static examples = ["$ noteli delete 2"];

  async init() {
    if (!(await pingServer())) {
      this.warn("We are having some server issues! Just hold on!");
      process.exit(0);
    }
  }

  async run() {
    try {
      const { args } = this.parse(Delete);

      const id = args.id;

      if (id == null) {
        this.warn("Please provide an ID in argument!");
      } else {
        new TokenConfig()
          .getToken(this.config.windows)
          .then(async (token) => {
            if (token == null) {
              this.warn(
                "You are not authorized to use this command!\n" +
                  chalk.green("Use $ note login to authorize")
              );
            } else {
              try {
                const response = await axios.delete(`${api}/note/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });

                // deleted
                this.log(chalk.green("Sad to see you deleting your Note :(\n"));
                this.log(
                  "But nevermind, note-taking is a good habit! Don’t leave that..."
                );
              } catch (error) {
                if (error.response == undefined) {
                  this.warn("We are having some server issues! Just hold on!");
                  process.exit(0);
                }
                if (error.response.data.idError) {
                  this.warn("Couldn't find your note! Provide a valid ID.");
                  process.exit(0);
                }
                if (error.response.data.noteError) {
                  this.warn("Failed to parse your note.");
                  process.exit(0);
                }
              }
            }
          })
          .catch((error) => {
            this.log(error);
          });
      }
    } catch (error) {
      this.log(error);
    }
  }
}
