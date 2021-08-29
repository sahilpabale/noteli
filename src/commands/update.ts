import Command from "@oclif/command";
import axios from "axios";
import chalk = require("chalk");
import inquirer = require("inquirer");
import pingServer from "../utils/pingServer";
import TokenConfig from "../utils/TokenConfig";

const { api } = require("../../package.json");

export class Update extends Command {
  static description = `update your note(s)
You can update some specific notes if you think they need some change.`;

  static usage = ["update <ID>"];

  static args = [{ name: "id" }];

  static examples = ["$ noteli update 2"];

  async init() {
    if (!(await pingServer())) {
      this.warn("We are having some server issues! Just hold on!");
      process.exit(0);
    }
  }

  async updateNote(id: string, token: string): Promise<void> {
    this.log(
      chalk.bold(
        `Press ${chalk.greenBright("<enter>")} to leave fields blank.\n`
      )
    );
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Title to update - ",
        },
        {
          type: "input",
          name: "content",
          message: "Content to update - ",
        },
      ])
      .then(async (answers) => {
        let data;
        if (answers.content == "" && answers.title == "") {
          this.warn("You have nothing to update :(");
          process.exit(0);
        } else if (answers.content == "") {
          // update title
          data = { title: answers.title };
        } else if (answers.title == "") {
          // update content
          data = { content: answers.content };
        } else {
          data = answers;
        }

        try {
          const response = await axios.patch(`${api}/note/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });

          this.log(
            `\nSuccessfully updated your note with ${chalk.green(`ID #${id}`)}`
          );
        } catch (error) {
          if (error.response == undefined) {
            this.warn("We are having some server issues! Just hold on!");
            process.exit(0);
          }
          if (error.response.data.idError) {
            this.warn("Please provide a valid ID!");
            process.exit(0);
          }
          if (error.response.data.serverError) {
            this.warn("Something's wrong on our side!");
            process.exit(0);
          }
          if (error.response.data.noteError) {
            this.warn("Failed to parse your note!");
            process.exit(0);
          }
        }
      })
      .catch((error) => {
        this.log(error);
      });
  }

  async fetchAndUpdateNote(id: string): Promise<void> {
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
                `${chalk.blueBright(`Title: `)}${chalk.green(note.title)}\n`
              );

              this.log(
                `${chalk.blueBright(`Content: `)}${chalk.green(note.content)}\n`
              );

              await this.updateNote(id, token);
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
              if (error.response.data.parseError) {
                this.warn("Failed to parse your note.");
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
  }

  async run() {
    try {
      const { args } = this.parse(Update);

      const id = args.id;
      if (id == null) {
        this.warn("Please provide note's ID in argument!");
      } else {
        await this.fetchAndUpdateNote(id);
      }
    } catch (error) {
      if (error.response == undefined) {
        this.warn("We are having some server issues! Just hold on!");
        this.exit(0);
      }
    }
  }
}
