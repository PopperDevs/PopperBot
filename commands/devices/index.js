const { permissionType, commandType } = require('../../lib/permissions');
const { validMessage } = require('../../lib/responseHandler');
const { getUser } = require('../../lib/utils');

const statuses = {
  idle: 'Idle',
  [undefined]: 'Offline',
  online: 'Online',
  dnd: 'DnD',
};

module.exports = {
  name: 'devices',
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'devices [user]',
  async handler({
    Discord, client, message, args,
  }) {
    const u = (await getUser(message, args.join(' '))) || message.author;
    return validMessage({
      Discord,
      client,
      message,
      command: this,
      author: { name: u.tag },
      thumbnail: u.displayAvatarURL(),
      fields: [
        ['Desktop', statuses[u.presence.clientStatus?.desktop]],
        ['Mobile', statuses[u.presence.clientStatus?.mobile]],
        ['Web', statuses[u.presence.clientStatus?.web]],
      ],
    });
  },
};
