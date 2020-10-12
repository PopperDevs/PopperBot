const { permissionType, commandType } = require('../../lib/permissions');
const { validMessage } = require('../../lib/responseHandler');

module.exports = {
  name: 'stop',
  aliases: ['exit', 'shutdown', 'restart'],
  type: commandType.owner.name,
  permissions: permissionType.owner,
  template: 'stop',
  async handler({ Discord, client, message }) {
    await validMessage({
      Discord,
      client,
      message,
      command: this,
      description: 'The bot will stop and try to restart now.',
    });
    process.exit();
  },
};
