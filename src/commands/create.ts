import Command from "@oclif/command";
import axios from "axios";
import chalk = require("chalk");
import inquirer = require("inquirer");
import pingServer from "../utils/pingServer";
import TokenConfig from "../utils/TokenConfig";

const api = "https://noteli-api.sahilpabale.me/api";

export class Create extends Command {
  static description = `create a new note
Helps you create a fresh new Note :)`;

  async init() {
    if (!(await pingServer())) {
      this.warn("We are having some server issues! Just hold on!");
      this.exit(0);
    }
  }

  async run() {
    try {
      const data = await new TokenConfig().getToken(this.config.windows);
      if (data == null) {
        this.warn(
          "You are not authorized to use this command!\n" +
            chalk.green("Use $ note login to authorize")
        );
      } else {
        this.log(
          chalk.greenBright("\nWhen your heart speaks, take good notes :)\n")
        );
        inquirer
          .prompt([
            {
              name: "title",
              type: "input",
              message: "A title for your note?",
              validate(input) {
                if (input == "") {
                  return "Please give your note a title!";
                } else {
                  return true;
                }
              },
            },
            {
              name: "content",
              type: "input",
              message: "Your note?",
              validate(input) {
                if (input == "") {
                  return "Please write something in your note!";
                } else {
                  return true;
                }
              },
            },
          ])
          .then(async (answers) => {
            const response = await axios.post(`${api}/note`, answers, {
              headers: {
                Authorization: `Bearer ${data.token}/${data.email}`,
              },
            });

            if (!data.isError) {
              const noteID = response.data.data.noteId;
              this.log(
                `\nSuccessfully created your note with ${chalk.green(
                  `ID #${noteID}`
                )}`
              );
            } else {
              // error
              if (response.data.code == 401) {
                this.log("You are not authenticated!");
              } else if (response.data.code == 400) {
                this.log("Failed to create note!");
              } else {
                this.log("server down!");
              }
            }
          })
          .catch((error) => {
            if (error.response == undefined) {
              this.warn("We are having some server issues! Just hold on!");
              this.exit(0);
            }
            if (error.response.data.noteError) {
              this.warn("This note doesn't exists!");
              this.exit(0);
            }
            if (error.response.data.serverError) {
              this.error("We are having some server issues! Just hold on!");
            }
            if (error.response.data.noteError) {
              this.warn("Failed to parse your note!");
              this.exit(0);
            }
          });
      }
    } catch (error) {
      this.log(error);
    }
  }
}
