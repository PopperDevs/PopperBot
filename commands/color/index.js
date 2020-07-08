const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'color',
  aliases: ['color'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'color',
  handler({ Discord, message, args }) {
    if (args.length === 1) args.unshift('hex');
    const subCommand = this.subCommands.get(args[0]);

    if (subCommand) {
      args.shift();
      subCommand.handler({ Discord, message, args });
    } else {
      message.channel.send(
        `Incorrect syntax! Correct usage of this command: \`${process.env.PREFIX}${this.template} <hex/rgb> <color>\``
      );
    }
  },
};

// TODO: Add commands list
