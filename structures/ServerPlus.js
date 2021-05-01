const { Client, Collection } = require("discord.js");
const Command = require("./Command")
const { Manager } = require('erela.js')
const path = require("path"),
glob = require("glob")

class ServerPlus extends Client {
  constructor(options = { partials: ['MESSAGE', 'REACTION'] }) {
    super(options);
    
    this.config = require('../config');
    this.commands = new Collection();
    this.aliases = new Collection();
    // this.manager = new Manager();
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  async loadCommands() {
    glob(`${this.directory}/commands/**/*.js`, (er, files) => {
      if (er) throw new Error(er);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const cmd = require(file);
        const command = new cmd(this);
        const filename = file.slice(file.lastIndexOf('/') + 1, file.length - 3);

        if (!(command instanceof Command))
          throw new TypeError(
            `${filename} is not a correct command. Not an instance of "Command" class.`
          );

        this.commands.set(command.name, command);

        command.aliases.length &&
          command.aliases.map((alias) => this.aliases.set(alias, command.name));

        console.log(
          `${filename} loaded (aliases below) ${command.aliases
            .map((alias) => `\n- ${alias}`)
            .join('')}`
        );
      }
    });
  }

  loadEvents() {
    glob(`${this.directory}/events/**/*.js`, (er, files) => {
      if (er) throw new Error(er);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const event = new (require(file))(this),
          eventname = file.slice(file.lastIndexOf('/') + 1, file.length - 3);

        if (event.enable) super.on(eventname, (...args) => event.run(...args));
      }
    });
  }

  login() {
    const TOKEN = this.config.Token;

    if (!TOKEN || typeof TOKEN != 'string')
      throw new Error('None or invalid token provided.');

    super.login(TOKEN);
  }

  init() {
    this.loadCommands();
    this.loadEvents()
    this.login();
  }
}

module.exports = ServerPlus