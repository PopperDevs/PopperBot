const { permissionType, commandType } = require('../../lib/permissions');
const { getUser } = require('../../lib/utils');

module.exports = {
  name: 'devices',
  aliases: [],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'devices [user]',
  async handler({ Discord, message, args }) {
    const u = (await getUser(message, args.join(' '))) || message.author;
    const statuses = {
      idle: 'Idle',
      [undefined]: 'Offline',
      online: 'Online',
      dnd: 'DnD',
    };
    message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(u.tag, u.displayAvatarURL())
        .setColor('#6F39B0')
        .setFooter(`devices | ${message.author.tag}`)
        .setTimestamp(message.createdAt)
        .setThumbnail(u.displayAvatarURL())
        .addField('Desktop', statuses[u.presence.clientStatus.desktop], true)
        .addField('Mobile', statuses[u.presence.clientStatus.mobile], true)
        .addField('Web', statuses[u.presence.clientStatus.web], true)
    );
  },
};
