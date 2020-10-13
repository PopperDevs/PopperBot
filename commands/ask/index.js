const { permissionType, commandType } = require('../../lib/permissions');
const { validMessage } = require('../../lib/responseHandler');

module.exports = {
  name: 'ask',
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'ask',
  async handler({ Discord, client, message }) {
    return validMessage({
      Discord,
      client,
      message,
      command: this,
      author: { name: 'Don\'t Ask To Ask' },
      description: `You will get help much faster by just asking your question
      and providing any relevant code examples.
      https://dontasktoask.com/`,
    });
  },
};
