const { permissionType, commandType } = require('../../lib/permissions');
const { getUser } = require('../../lib/utils');

module.exports = {
  name: 'userinfo',
  aliases: ['whois'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'userinfo [user]',
  async handler({ Discord, message, args }) {
    const u = message.guild.member(
      (await getUser(message, args.join(' '))) || message.author,
    );
    message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(u.user.tag, u.user.displayAvatarURL())
        .setColor('#6F39B0')
        .setFooter(`userinfo | ${message.author.tag}`)
        .setTimestamp(message.createdAt)
        .setThumbnail(u.user.displayAvatarURL())
        .addField('ID', u.user.id)
        .addField(
          'Permissions',
          u.permissions
            .toArray()
            .map((x) => x
              .toLowerCase()
              .split('_')
              .map((y) => y.replace(/^./, (z) => z.toUpperCase()))
              .join(' '))
            .join(', '),
        )
        .addField('Roles', u.roles.cache.map((x) => x.toString()).join(', '))
        .addField('Joined At', u.joinedAt.toLocaleString(), true)
        .addField('Registered At', u.user.createdAt.toLocaleString(), true),
    );
  },
};
