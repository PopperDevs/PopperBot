const { parse } = require('node-html-parser');
const fetch = require('node-fetch');

const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'code',
  aliases: [],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'code',
  async handler({ Discord, client, message }) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Sending Code`, client.user.avatarURL())
      .setColor('#6F39B0')
      .setDescription(`You can use the following template to share your code.`)
      // prettier-ignore
      .addField('Example', '`` ```language \ncode here \n``` ``')
      .setTimestamp(message.createdAt)
      .setFooter(`code | ${message.author.tag}`);

    message.channel.send(embed);
  },
};
