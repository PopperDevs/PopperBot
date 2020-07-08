const { permissionType, commandType } = require('../../lib/permissions');
const { parent } = require('./index');

module.exports = {
  name: 'hex',
  aliases: [],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'hex',
  parent,
  handler({ Discord, args, message }) {
    let s = args[0];
    if (s !== 'random' && !/^([0-9a-f]{3}){1,2}$/i.test(s)) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#FF9AA2')
          .setTitle(
            `Incorrect syntax! Correct usage of this command: \`${process.env.PREFIX}color rgb <hex value>\`, for example \`${process.env.PREFIX}color hex ffffff\``
          )
      );
    }
    if (s === 'random') s = Math.random().toString(16).slice(2, 8);
    if (s.length === 3) s = [...s].map((x) => x + x).join('');
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#' + s)
        .setTitle('#' + s)
        .setThumbnail(`https://via.placeholder.com/150/${s}?text=+`)
        .setTimestamp(message.createdAt)
        .setFooter(`hex | ${message.author.tag}`)
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
