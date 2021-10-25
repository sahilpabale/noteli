import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";
import * as os from "os";
import axios from "axios";

import { api } from "../../package.json";

export default class TokenConfig {
  async setToken(token: string, isWindows: boolean): Promise<void> {
    if (isWindows) {
      try {
        const tokenLoc = path.join(os.homedir(), "\\.noteli");

        if (await this.checkFile(tokenLoc)) {
          // file exists, now set the token!
          fs.writeFileSync(tokenLoc, `${token}`);

          console.log(chalk.greenBright("\nToken added successfully!"));
        } else {
          // create file and set the token!
          fs.writeFileSync(tokenLoc, `${token}`);

          console.log(chalk.greenBright("\nToken added successfully!"));
        }
      } catch (error) {
        console.log(chalk.redBright(error));
      }
    } else {
      try {
        const tokenLoc = path.join(os.homedir(), "/.noteli");

        if (await this.checkFile(tokenLoc)) {
          // file exists, now set the token!
          fs.writeFileSync(tokenLoc, `${token}`);
          console.log(chalk.greenBright("\nToken added successfully!"));
        } else {
          // create file and set the token!
          fs.writeFileSync(tokenLoc, `${token}`);
          console.log(chalk.greenBright("\nToken added successfully!"));
        }
      } catch (error) {
        console.log(chalk.redBright(error));
      }
    }
  }

  async revokeToken(isWindows: boolean): Promise<void> {
    if (isWindows) {
      try {
        const tokenLoc = path.join(os.homedir(), "\\.noteli");

        if (await this.checkFile(tokenLoc)) {
          fs.unlink(tokenLoc, (err) => {
            if (err) {
              console.log(chalk.redBright("\nFailed to log out!"));
            } else {
              console.log(chalk.greenBright("\nSuccessfully logged out!"));
            }
          });
        } else {
          console.log(chalk.greenBright("\nSuccessfully logged out!"));
        }
      } catch (error) {
        console.log(chalk.redBright(error));
      }
    } else {
      try {
        const tokenLoc = path.join(os.homedir(), "/.noteli");

        if (await this.checkFile(tokenLoc)) {
          fs.unlink(tokenLoc, (err) => {
            if (err) {
              console.log(chalk.redBright("\nFailed to log out!"));
            } else {
              console.log(chalk.greenBright("\nSuccessfully logged out!"));
            }
          });
        } else {
          console.log(chalk.greenBright("\nSuccessfully logged out!"));
        }
      } catch (error) {
        console.log(chalk.redBright(error));
      }
    }
  }

  async getToken(isWindows: boolean): Promise<any> {
    if (isWindows) {
      try {
        const tokenLoc = path.join(os.homedir(), "\\.noteli");
        const token = fs.readFileSync(tokenLoc, { encoding: "utf-8" });

        return token;
      } catch (error) {
        return null;
      }
    } else {
      try {
        const tokenLoc = path.join(os.homedir(), "/.noteli");
        const token = fs.readFileSync(tokenLoc, { encoding: "utf-8" });

        return token;
      } catch (error) {
        return error;
      }
    }
  }

  async getUser(token: string): Promise<any> {
    try {
      const response = await axios.post(
        `${api}/user`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  protected async checkFile(file: string): Promise<boolean> {
    try {
      fs.accessSync(file);
      return true;
    } catch (error) {
      return false;
    }
  }
}
