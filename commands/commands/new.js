const fs = require('fs');

const parent = require('./index');

const { log } = require('../../lib/log');
const { getCommands } = require('../index');

module.exports = {
  name: 'new',
  aliases: ['add', '+'],
  template: 'new <commandName>',
  parent,
  handler({ message, args }) {
    const comm = getCommands().get(args[0]);
    if (comm) {
      message.channel.send(`The command ${comm.name} is already in the system. Try reloading it instead.`);
    } else {
      let added = false;
      const files = fs.readdirSync(`${__dirname}/..`);
      files.map(async (file) => {
        if (file !== 'index.js') {
          const command = require(`../${file}`);
          if (command.name === args[0] || command.aliases.some((a) => a === args[0])) {
            getCommands().set(command.name, command);
            log.emit('log', `${new Date().toLocaleString()} | Command ${command.name} was loaded !`);

            command.aliases.forEach((c) => {
              getCommands().set(c, command);
              log.emit('log', `${new Date().toLocaleString()} | Alias ${c} was loaded !`);
            });

            message.channel.send(`The command ${command.name} has been added to the system !`);
            added = true;
          }
        }
      });
      if (!added) {
        message.channel.send(`The command ${args[0]} could not be added to the system. Be sure it exists.`);
      }
    }
  },
};
