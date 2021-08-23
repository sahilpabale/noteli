import { Hook } from "@oclif/config";
import * as figlet from "figlet";
import * as chalk from "chalk";

const hook: Hook<"init"> = async function (opts) {
  console.log(
    chalk.red(
      figlet.textSync("Noteli", {
        horizontalLayout: "full",
      })
    )
  );
};

export default hook;
