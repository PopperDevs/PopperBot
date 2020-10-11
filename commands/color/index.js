const { permissionType, commandType } = require('../../lib/permissions');
const { syntaxErrorMessage, unAuthorizedCommand } = require('../../lib/responseHandler');
const { hasPermission } = require('../../lib/utils');

module.exports = {
  name: 'color',
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'color',
  handler({
    Discord, client, message, args
  }) {
    const subCommand = this.subCommands.get(args.length === 1 ? 'hex' : args[0]);

    if (subCommand) {
      if (hasPermission({ author: message.author, member: message.member }, subCommand)) {
        if (args.length > 1) args.shift();
        return subCommand.handler({
          Discord, client, message, args
        });
      }
      return unAuthorizedCommand(Discord, message, this);
    }
    return syntaxErrorMessage(Discord, message, this, ' <hex/rgb> <value>');
  },
};

// TODO: Add commands list
