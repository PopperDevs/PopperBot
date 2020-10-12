const { permissionType, commandType } = require('../../lib/permissions');
const { validMessage } = require('../../lib/responseHandler');

module.exports = {
  name: 'code',
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'code',
  async handler({ Discord, client, message }) {
    return validMessage({
      Discord,
      client,
      message,
      command: this,
      author: { name: 'Sending Code' },
      description: 'You can use the following template to share your code.',
      fields: [['Example', '`` ```language \ncode here \n``` ``']],
    });
  },
};
