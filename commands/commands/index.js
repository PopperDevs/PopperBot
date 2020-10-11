const { permissionType, commandType } = require('../../lib/permissions');
const { unAuthorizedCommand, syntaxErrorMessage } = require('../../lib/responseHandler');

const { hasPermission } = require('../../lib/utils');

module.exports = {
  name: 'commands',
  aliases: ['cmd'],
  type: commandType.owner.name,
  permissions: permissionType.owner,
  template: 'commands',
  handler({
    Discord, client, message, args
  }) {
    const subCommand = this.subCommands.get(args[0]);

    if (subCommand) {
      if (hasPermission({ author: message.author, member: message.member }, subCommand)) {
        args.shift();
        return subCommand.handler({
          Discord, client, message, args
        });
      }
      return unAuthorizedCommand(Discord, message, this);
    }
    return syntaxErrorMessage(Discord, message, this, ' <add/del/rl> <commandName>');
  },
};

// TODO: Add commands list
