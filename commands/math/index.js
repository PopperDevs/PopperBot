const { evaluate } = require('mathjs');
const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'math',
  aliases: ['m', 'calc'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'math',
  handler({ Discord, args, message }) {
    const s = args.join(' ');
    const embed = new Discord.MessageEmbed()
      .setTimestamp(message.createdAt)
      .setTitle(s)
      .setFooter(`math | ${message.author.tag}`);
    try {
      embed
        .addField('Result', `\`\`\`\n${evaluate(s)}\n\`\`\``)
        .setColor('#6F39B0');
    } catch (e) {
      embed.setColor('#FF9AA2').setDescription(e);
    }

    message.channel.send(embed);
  },
};
