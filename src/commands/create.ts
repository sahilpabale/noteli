import Command from "@oclif/command";
import axios from "axios";
import chalk = require("chalk");
import inquirer = require("inquirer");
import pingServer from "../utils/pingServer";
import TokenConfig from "../utils/TokenConfig";

const { api } = require("../../package.json");

export class Create extends Command {
  static description = `create a new note
Helps you create a fresh new Note :)`;

  async init() {
    if (!(await pingServer())) {
      this.warn("We are having some server issues! Just hold on!");
      process.exit(0);
    }
  }

  async run() {
    try {
      const token = await new TokenConfig().getToken(this.config.windows);
      if (token == null) {
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
            try {
              const response = await axios.post(`${api}/note`, answers, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              this.log("created note!");
            } catch (error) {
              if (error.response == undefined) {
                this.warn("We are having some server issues! Just hold on!");
                process.exit(0);
              }
              if (error.response.data.noteError) {
                this.warn("Note is empty to be created!");
                process.exit(0);
              }
              if (error.response.data.serverError) {
                this.error("We are having some server issues! Just hold on!");
              }
              if (error.response.data.parseError) {
                this.warn("Note is empty to be created!");
                process.exit(0);
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
