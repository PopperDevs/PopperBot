const { permissionType, commandType } = require('../../lib/permissions');
const { validMessage } = require('../../lib/responseHandler');
const { getUser } = require('../../lib/utils');

module.exports = {
  name: 'userinfo',
  aliases: ['whois'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'userinfo [user]',
  async handler({
    Discord, client, message, args,
  }) {
    const u = message.guild.member(
      (await getUser(message, args.join(' '))) || message.author,
    );
    return validMessage({
      Discord,
      client,
      message,
      command: this,
      author: { name: u.user.tag, avatar: u.user.displayAvatarURL() },
      thumbnail: u.user.displayAvatarURL(),
      fields: [
        ['ID', u.user.id, false],
        ['Permissions',
          u.permissions
            .toArray()
            .map((x) => x
              .toLowerCase()
              .split('_')
              .map((y) => y.replace(/^./, (z) => z.toUpperCase()))
              .join(' '))
            .join(', '), false],
        ['Roles', u.roles.cache.map((x) => x.toString()).join(', '), false],
        ['Joined At', u.joinedAt.toLocaleString()],
        ['Registered At', u.user.createdAt.toLocaleString()],
      ],
    });
  },
};
