const { parse } = require('node-html-parser');
const fetch = require('node-fetch');

const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'phpdoc',
  aliases: ['phpdoc'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'phpdoc',
  async handler({ Discord, client, message }) {
    const args = message.content.slice(8);
    const encodedQuery = encodeURIComponent(args);

    const queryUrl = `https://php.net/${encodedQuery}`;

    const res = await fetch(`${queryUrl}`);
    const text = await res.text();
    const data = parse(text);

    const embed = new Discord.MessageEmbed()
      .setAuthor(`Search results for ${args}`, client.user.avatarURL())
      .setColor('#6F39B0');

    if (text.includes("doesn't exist")) {
      embed.setDescription(
        'I did not find an exact match, maybe you are looking for one of the following?'
      );

      const urls = data.querySelectorAll('#quickref_functions li a');

      for (let i = 0; i < 3; i += 1) {
        const title = urls[i].innerHTML.replace(/<[^>]*>?/gm, '');
        const url = `https://php.net${urls[i].getAttribute('href')}`;

        embed.addField(title, url);
      }
    } else {
      const dcTitle = data.querySelector('.dc-title').innerHTML;
      embed.setDescription(`The official documentation for "${args}"`);
      embed.addField(dcTitle, queryUrl);
    }

    message.channel.send(embed);
  },
};
