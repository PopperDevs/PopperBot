const { permissionType, commandType } = require('../../lib/permissions');
const { validMessage, errorMessage } = require('../../lib/responseHandler');
const { getRole } = require('../../lib/utils');

module.exports = {
  name: 'roleinfo',
  aliases: [],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'roleinfo [role]',
  async handler({
    Discord, client, message, args,
  }) {
    const role = await getRole(message, args.join(' '));
    if (!role) return errorMessage(Discord, message, this, args, 'No role found.');
    return validMessage({
      Discord,
      client,
      message,
      command: this,
      fields: [
        ['Name', `<@&${role.id}>`],
        ['ID', role.id],
        ['Hoisted', role.hoist ? 'Yes' : 'No'],
        ['Color', role.hexColor],
        ['Mentionable', role.mentionable ? 'Yes' : 'No'],
        ['Users in Role: ', role.members.size],
        ['Created at', role.createdAt.toLocaleString()],
      ],
    });
  },
};
