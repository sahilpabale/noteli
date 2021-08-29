import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";
import * as os from "os";
import axios from "axios";

const api = "https://noteli-api.sahilpabale.me/api";

export default class TokenConfig {
  async setToken(
    token: string,
    email: string,
    isWindows: boolean
  ): Promise<void> {
    if (isWindows) {
      try {
        const tokenLoc = path.join(os.homedir(), "\\.noteli");

        if (await this.checkFile(tokenLoc)) {
          // file exists, now set the token!
          fs.writeFileSync(tokenLoc, `${token}/${email}`);

          console.log(chalk.greenBright("\nToken added successfully!"));
        } else {
          // create file and set the token!
          fs.writeFileSync(tokenLoc, `${token}/${email}`);

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
          fs.writeFileSync(tokenLoc, `${token}/${email}`);
          console.log(chalk.greenBright("\nToken added successfully!"));
        } else {
          // create file and set the token!
          fs.writeFileSync(tokenLoc, `${token}/${email}`);
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
              console.log(chalk.redBright("Failed to log out!"));
            } else {
              console.log(chalk.greenBright("Successfully logged out!"));
            }
          });
        } else {
          console.log(chalk.greenBright("Successfully logged out!"));
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
              console.log(chalk.redBright("Failed to log out!"));
            } else {
              console.log(chalk.greenBright("Successfully logged out!"));
            }
          });
        } else {
          console.log(chalk.greenBright("Successfully logged out!"));
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
        const data = fs.readFileSync(tokenLoc, { encoding: "utf-8" });
        const token = data.split("/")[0];
        const email = data.split("/")[1];
        return { token, email };
      } catch (error) {
        return null;
      }
    } else {
      try {
        const tokenLoc = path.join(os.homedir(), "/.noteli");
        const data = fs.readFileSync(tokenLoc, { encoding: "utf-8" });
        const token = data.split("/")[0];
        const email = data.split("/")[1];
        return { token, email };
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
