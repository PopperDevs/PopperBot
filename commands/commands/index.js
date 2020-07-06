const { permissionType, commandType } = require('../../lib/permissions');

const { hasPermission } = require('../../lib/utils');

module.exports = {
  name: 'commands',
  aliases: [],
  type: commandType.owner.name,
  permissions: permissionType.owner,
  template: 'commands',
  handler({ message, args }) {
    const subCommand = this.subCommands.get(args[0]);

    if (subCommand) {
      if (hasPermission({ author: message.author, member: message.member }, subCommand)) {
        args.shift();
        subCommand.handler({ message, args });
      } else {
        message.reply('you are not authorized to execute this command. 🛑');
      }
    } else {
      message.channel.send(`Incorrect syntax ! Correct usage of this command : \`${process.env.PREFIX}${this.template} <rl> <commandName>\``);
    }
  },
};

// TODO: Add commands list
