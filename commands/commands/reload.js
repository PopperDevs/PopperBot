const fs = require('fs');

const { log } = require('../../lib/log');
const { syntaxErrorMessage, validMessage } = require('../../lib/responseHandler');
const { getCommands } = require('../index');

module.exports = {
  name: 'reload',
  aliases: ['rl'],
  template: 'rl <commandName>',
  handler({
    Discord, client, message, args,
  }) {
    // if (args[0] === 'all') {
    //   getCommands().forEach((command) => {
    //     delete require.cache[require.resolve(`../${command.name}`)];
    //     command.subCommands.forEach((subCommand) => {
    //       delete require.cache[require.resolve(`../${command.name}/${subCommand.name}`)];
    //     });
    //     log.emit('log', `Cache deleted for ${command.name}`);
    //   });
    //   clearCommands();
    //   message.channel.send('All the commands have been reloaded !');
    // } else {
    const command = getCommands().get(args[0]);
    if (command) {
      delete require.cache[require.resolve(`../${command.name}`)];
      command.subCommands.forEach((subCommand) => {
        delete require.cache[require.resolve(`../${command.name}/${subCommand.name}`)];
      });

      command.aliases.forEach((alias) => {
        getCommands().delete(alias);
      });
      getCommands().delete(command.name);

      const comm = require(`../${command.name}`);

      comm.subCommands = new Map();
      fs.readdirSync(`${__dirname}/../${command.name}`).forEach((subCommand) => {
        if (subCommand !== 'index.js') {
          const subCommandInfo = require(`../${command.name}/${subCommand}`);
          comm.subCommands.set(subCommandInfo.name, subCommandInfo);
          subCommandInfo.aliases.forEach((alias) => {
            comm.subCommands.set(alias, subCommandInfo);
          });
        }
      });

      getCommands().set(comm.name, comm);
      log.emit('log', `${new Date().toLocaleString()} | Command ${comm.name} was reloaded !`);

      comm.aliases.forEach((alias) => {
        getCommands().set(alias, comm);
        log.emit('log', `${new Date().toLocaleString()} | Alias ${alias} was reloaded !`);
      });

      return validMessage({
        Discord,
        client,
        message,
        command: this,
        description: `The command ${comm.name} has been reloaded !`,
      });
    }
    return syntaxErrorMessage(Discord, message, this);

    // }
  },
};

// FIXME: reload all doesn't actually reload
