import Command from "@oclif/command";

export class Logout extends Command {
  async run() {
    this.log("logged out");
  }
}
