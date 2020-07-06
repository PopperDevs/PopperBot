const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'stop',
  aliases: ['exit', 'shutdown', 'restart'],
  type: commandType.owner.name,
  permissions: permissionType.owner,
  template: 'stop',
  async handler({ message }) {
    await message.reply('the bot will stop and try to restart now.');
    process.exit();
  },
};
