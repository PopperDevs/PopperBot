const { log } = require('../../lib/log');
const { validMessage, errorMessage } = require('../../lib/responseHandler');
const { getCommands } = require('../index');

module.exports = {
  name: 'delete',
  aliases: ['del', 'rm', '-'],
  template: 'del <existingCommandName>',
  handler({
    Discord, client, message, args,
  }) {
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

      log.emit('log', `${new Date().toLocaleString()} | Command ${command.name} was deleted !`);

      return validMessage({
        Discord,
        client,
        message,
        command: this,
        title: 'Command Delete',
        description: `The command ${command.name} has been deleted from the system !`,
      });
    }
    return errorMessage(Discord, message, this, args, 'The command you tried to delete is unknown !');
  },
};
