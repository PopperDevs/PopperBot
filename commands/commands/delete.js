const parent = require('./index');

const { log } = require('../../lib/log');
const { getCommands } = require('../index');

module.exports = {
  name: 'delete',
  aliases: ['del', 'remove', '-'],
  template: 'del <commandName>',
  parent,
  handler({ message, args }) {
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

      message.channel.send(`The command ${command.name} has been deleted from the system !`);
    } else {
      message.channel.send(`The command you tried to delete is unknown ! Correct usage of this command : \`${process.env.PREFIX}${this.parent.template} ${this.template}\``);
    }
  },
};
