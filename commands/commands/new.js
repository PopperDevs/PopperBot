const fs = require('fs');

const { log } = require('../../lib/log');
const { errorMessage, validMessage } = require('../../lib/responseHandler');
const { getCommands } = require('../index');

module.exports = {
  name: 'new',
  aliases: ['add', '+'],
  template: 'new <commandName>',
  handler({
    Discord, client, message, args,
  }) {
    const comm = getCommands().get(args[0]);
    if (comm) return errorMessage(Discord, message, this, args, `The command ${comm.name} is already in the system. Try reloading it instead.`);

    let added = false;
    const files = fs.readdirSync(`${__dirname}/..`);
    files.forEach(async (file) => {
      if (file === 'index.js' || file === 'README.md') return;
      const command = require(`../${file}`);
      if (command.name === args[0] || (command.aliases || []).some((a) => a === args[0])) {
        getCommands().set(command.name, command);
        log.emit('log', `${new Date().toLocaleString()} | Command ${command.name} was loaded !`);

        (command.aliases || []).forEach((c) => {
          getCommands().set(c, command);
          log.emit('log', `${new Date().toLocaleString()} | Alias ${c} was loaded !`);
        });
        added = true;
        validMessage({
          Discord,
          client,
          message,
          command: this,
          description: `The command ${command.name} has been added to the system !`,
        });
      }
    });
    if (added) return true;
    return errorMessage(Discord, message, this, args, `The command ${args[0]} could not be added to the system. Be sure it exists.`);
  },
};

// TODO: Refactor (return)
