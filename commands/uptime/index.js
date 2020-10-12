const { permissionType, commandType } = require('../../lib/permissions');
const { validMessage } = require('../../lib/responseHandler');

const { mstoTime } = require('../../lib/utils');

module.exports = {
  name: 'uptime',
  aliases: ['up'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'up',
  handler({ Discord, client, message }) {
    return validMessage({
      Discord,
      client,
      message,
      command: this,
      description: `🤖 The bot has been up and running for ${mstoTime(client.uptime)} !`,
      fields: [
        ['Last ready at', client.readyAt.toLocaleString()],
      ],
    });
  },
};
