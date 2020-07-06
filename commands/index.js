const fs = require('fs');

const { log } = require('../lib/log.js');

let commands = null;

function getCommands() {
  if (commands) return commands;

  commands = new Map();

  fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js' && file !== 'README.md') {
      const command = require(`./${file}`);

      command.subCommands = new Map();

      fs.readdirSync(`${__dirname}/${file}`).forEach((subCommand) => {
        if (subCommand !== 'index.js') {
          const subCommandInfo = require(`${__dirname}/${file}/${subCommand}`);
          command.subCommands.set(subCommandInfo.name, subCommandInfo);
          subCommandInfo.aliases.forEach((alias) => {
            command.subCommands.set(alias, subCommandInfo);
          });
        }
      });

      commands.set(command.name, command);
      log.emit('log', `Command ${command.name} was loaded !`);

      command.aliases.forEach((alias) => {
        commands.set(alias, command);
        log.emit('log', `Alias ${alias} was loaded !`);
      });
    }
  });

  return commands;
}

module.exports = {
  getCommands,
};
