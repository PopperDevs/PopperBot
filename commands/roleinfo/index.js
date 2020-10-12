const { permissionType, commandType } = require('../../lib/permissions');
const { getRole } = require('../../lib/utils');

module.exports = {
  name: 'roleinfo',
  aliases: [],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'roleinfo [role]',
  async handler({ Discord, message, args }) {
    const role = await getRole(message, args.join(' '));
    if (!role) {
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#FF9AA2')
          .setFooter(`roleinfo | ${message.author.tag}`)
          .setTimestamp(message.createdAt)
          .setTitle('No role found.'),
      );
    } else {
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#6F39B0')
          .setFooter(`roleinfo | ${message.author.tag}`)
          .setTimestamp(message.createdAt)
          .addField('Name', `<@&${role.id}>`, true)
          .addField('ID', role.id, true)
          .addField('Hoisted', role.hoist ? 'Yes' : 'No', true)
          .addField('Color', role.hexColor, true)
          .addField('Mentionable', role.mentionable ? 'Yes' : 'No', true)
          .addField('Users in Role: ', role.members.size, true)
          .addField('Created at', role.createdAt.toLocaleString(), true),
      );
    }
  },
};
