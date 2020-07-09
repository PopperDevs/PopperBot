const { parse } = require('node-html-parser');
const fetch = require('node-fetch');

const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'ask',
  aliases: [],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'ask',
  async handler({ Discord, client, message }) {
    const embed = new Discord.MessageEmbed()
      .setAuthor("Don't Ask to Ask", client.user.avatarURL())
      .setColor('#6F39B0')
      .setDescription(
        `You will get help much faster by just asking your question 
        and providing any relevant code examples.\n https://dontasktoask.com/`
      )
      .setTimestamp(message.createdAt)
      .setFooter(`ask | ${message.author.tag}`);

    message.channel.send(embed);
  },
};
