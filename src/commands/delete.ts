import Command from "@oclif/command";
import axios from "axios";
import chalk = require("chalk");
import pingServer from "../utils/pingServer";
import TokenConfig from "../utils/TokenConfig";

const api = "https://noteli-api.sahilpabale.me/api";

export class Delete extends Command {
  static description = `delete your note(s)
You can delete some specific notes if you think they are not worthy.`;

  static usage = ["delete <ID>"];

  static args = [{ name: "id" }];

  static examples = ["$ noteli delete 2"];

  async init() {
    if (!(await pingServer())) {
      this.warn("We are having some server issues! Just hold on!");
      this.exit(0);
    }
  }

  async run() {
    try {
      const { args } = this.parse(Delete);

      const id = args.id;

      if (id == null) {
        this.warn("Please provide note's ID in argument!");
      } else {
        new TokenConfig()
          .getToken(this.config.windows)
          .then(async (data) => {
            if (data == null) {
              this.warn(
                "You are not authorized to use this command!\n" +
                  chalk.green("Use $ note login to authorize")
              );
            } else {
              const token = `${data.token}/${data.email}`;

              const response = await axios.delete(`${api}/note/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });

              if (!response.data.isError) {
                // deleted
                this.log(chalk.green("Sad to see you deleting your Note :(\n"));
                this.log(
                  "But nevermind, note-taking is a good habit! Don’t leave that..."
                );
              } else {
                this.log(response.data);
              }
            }
          })
          .catch((error) => {
            if (error.response == undefined) {
              this.warn("We are having some server issues! Just hold on!");
              this.exit(0);
            }
            if (error.response.data.idError) {
              this.warn("Please provide a valid ID!");
              this.exit(0);
            }
            if (error.response.data.serverError) {
              this.error("We are having some server issues! Just hold on!");
            }
          });
      }
    } catch (error) {
      this.log(error);
    }
  }
}
