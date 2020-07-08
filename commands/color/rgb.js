const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'rgb',
  aliases: ['rgb'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'rgb',
  async handler({ Discord, args, message }) {
    let s = args.join(' ');
    console.log(args);
    if (
      s !== 'random' &&
      (!/^\d{1,3} \d{1,3} \d{1,3}$/i.test(s) ||
        !args.every((x) => +x >= 0 && +x <= 255))
    ) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#FF9AA2')
          .setTitle(
            'Invalid usage. Please enter a valid RGB code, separated by spaces.'
          )
      );
    }
    if (s === 'random')
      s = [...Array(3)].map(() => (Math.random() * 256) | 0).join(' ');
    const hexCode = args
      .map((x) => (+x).toString(16).padStart(2, 0))
      .join('')
      .toUpperCase();
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#' + hexCode)
        .setTitle('RGB ' + args.join(', '))
        .setThumbnail(`https://via.placeholder.com/150/${hexCode}?text=+`)
        .setTimestamp(message.createdAt)
        .setFooter(message.author.tag)
        .addField('Hex', '#' + hexCode)
    );
  },
};
