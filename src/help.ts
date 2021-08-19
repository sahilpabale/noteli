import Help from "@oclif/plugin-help";
import Command from "@oclif/command";

// "helpClass": "./src/help",

export default class NoteliHelp extends Help {
  showRootHelp() {
    console.log(this.config.name);
  }
}
