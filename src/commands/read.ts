import Command from "@oclif/command";
import axios from "axios";
import chalk = require("chalk");
import ux from "cli-ux";
import pingServer from "../utils/pingServer";
import TokenConfig from "../utils/TokenConfig";

const { api } = require("../../package.json");

export class Read extends Command {
  static description = `read all your notes
You can read all your notes or some specific note too.`;

  async init() {
    if (!(await pingServer())) {
      this.warn("We are having some server issues! Just hold on!");
      this.exit(0);
    }
  }

  static usage = ["read", "read <ID>"];

  static args = [{ name: "id" }];

  static examples = ["$ noteli read", "$ noteli read 2"];

  readAllNotes = async () => {
    try {
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
              ux.action.start(chalk.blueBright("Fetching your notes"));

              const response = await axios.get(`${api}/notes`, {
                headers: { Authorization: `Bearer ${token}` },
              });

              ux.action.stop("\n");

              let note;

              this.log(chalk.bold(chalk.blueBright("ID\tNote Title")));

              for (let i = 0; i < response.data.data.length; i++) {
                note = response.data.data[i];
                this.log(
                  chalk.greenBright("#" + note.noteId + "\t" + note.title)
                );
              }

              this.log(
                `\nTo grab specific note, just run\n${chalk.green(
                  "$ noteli read <ID>"
                )}`
              );
            } catch (error) {
              if (error.response.data.notesError) {
                ux.action.stop(
                  chalk.yellow("\n\nYou haven't created any notes!")
                );
                this.log(
                  `Use ${chalk.greenBright(
                    "$ noteli create"
                  )} to create your first note!`
                );
              }
              if (error.response.data.authError) {
                ux.action.stop(chalk.yellow("\n\nYou aren't authorized!"));
                this.log(
                  `Use ${chalk.greenBright("$ noteli login")} to login!`
                );
              }
            }
          }
        })
        .catch((err) => {
          this.log(err);
        });
    } catch (error) {
      this.log(error);
    }
  };

  readNote = async (id: number) => {
    try {
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
              const response = await axios.get(`${api}/note/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });

              const note = response.data.data;

              this.log(
                chalk.bold(
                  `${chalk.yellow(`#${id} - `)}${chalk.green(note.title)}\n`
                )
              );

              this.log(chalk.bold(`${chalk.green(`${note.content}`)}`));
            } catch (error) {
              if (error.response == undefined) {
                this.warn("We are having some server issues! Just hold on!");
                process.exit(0);
              }
              if (error.response.data.authError) {
                this.warn("You are not authenticated!");
                process.exit(0);
              }
              if (error.response.data.idError) {
                this.warn("You have provided wrong ID!");
                process.exit(0);
              }
              if (error.response.data.parseError) {
                this.warn("Please provide a valid ID!");
                process.exit(0);
              }
            }
          }
        })
        .catch((error) => {
          this.log(error);
        });
    } catch (error) {
      this.log(error);
    }
  };

  async run() {
    let ops = "all";

    try {
      const { args } = this.parse(Read);

      if (args.id != null) {
        ops = args.id;
      }

      if (ops == "all") {
        await this.readAllNotes();
      } else {
        await this.readNote(parseInt(args.id));
      }
    } catch (error) {
      this.log(error);
    }
  }
}
