const { permissionType, commandType } = require('../../lib/permissions');
const { evaluate } = require('mathjs');

module.exports = {
  name: 'math',
  aliases: ['m'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'math',
  handler({ Discord, args, message }) {
    let s = args.join(' ');
    const embed = new Discord.MessageEmbed()
      .setTimestamp(message.createdAt)
      .setFooter(`math | ${message.author.tag}`);
    try {
      embed.addField('Result', evaluate(s)).setColor('#6F39B0');
    } catch (e) {
      embed.setColor('#FF9AA2').setTitle(e);
    }

    return message.channel.send(embed);
  },
};
