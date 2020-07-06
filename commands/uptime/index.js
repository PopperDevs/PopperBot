const { permissionType, commandType } = require('../../lib/permissions');

const { mstoTime } = require('../../lib/utils');

module.exports = {
  name: 'uptime',
  aliases: ['up'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'up',
  handler({ client, message }) {
    message.channel.send(`🤖 The bot has been up and running for ${mstoTime(client.uptime)} !`);
  },
};
// TODO: make it nice, an embed ? Start time ?
