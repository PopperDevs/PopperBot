const { permissionType, commandType } = require('../../lib/permissions');

const { getCommands } = require('../index');
const { hasPermission } = require('../../lib/utils');
const { validMessage } = require('../../lib/responseHandler');

function cmdDesc(x) {
  return `${Object.values(commandType).find(({ name }) => name === x).description}\n`;
}

module.exports = {
  name: 'help',
  aliases: ['h'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'help',
  handler({ Discord, client, message }) {
    let fields = [];

    Object.values(commandType).forEach((c) => {
      fields.push([c.name, `${c.description}\n`, false]);
    });

    getCommands().forEach((command) => {
      const field = fields.find(([name]) => name === command.type);
      if (field[1].split('\n')[1].includes(command.name)) return;
      if (!hasPermission({ author: message.author, member: message.member }, command)) return;
      if (field[1] !== cmdDesc(command.type)) field[1] += ', ';
      field[1] += `**${command.name}**${command.aliases ? ` (${command.aliases.join(', ')})` : ''}`;
    });

    fields = fields.filter(([n, v]) => v !== cmdDesc(n));

    return validMessage({
      Discord,
      client,
      message,
      command: this,
      author: { name: 'Help' },
      thumbnail: client.user.displayAvatarURL(),
      fields,
    });
  },
};

// TODO: filter the commands list by category
