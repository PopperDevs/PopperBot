const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'hex',
  aliases: ['hex'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'hex',
  async handler({ Discord, client, message }) {
    let s = message.content.slice(5) || 'random';
    if (s !== 'random' && !/^([0-9a-f]{3}){1,2}$/i.test(s)) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#FF9AA2')
          .setTitle('Invalid usage. Please put a valid hex code in.')
      );
    }
    if (s === 'random') s = Math.random().toString(16).slice(2, 8);
    if (s.length === 3) s = [...s].map((x) => x + x).join('');
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#' + s)
        .setTitle('#' + s)
        .setThumbnail(`https://via.placeholder.com/150/${s}?text=+`)
        .addField(
          'RGB',
          parseInt(s.slice(0, 2), 16) +
            ', ' +
            parseInt(s.slice(2, 4), 16) +
            ', ' +
            parseInt(s.slice(4), 16)
        )
    );
  },
};
