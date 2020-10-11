const { parse } = require('node-html-parser');
const fetch = require('node-fetch');

const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'mdn',
  aliases: ['mdn'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'mdn',
  async handler({ Discord, client, message }) {
    const args = message.content.slice(4);
    const encodedQuery = encodeURIComponent(args);

    const url = `https://developer.mozilla.org/en-US/search?q=${encodedQuery}`;

    const res = await fetch(`${url}`);
    const text = await res.text();
    const data = parse(text);

    const resultTitles = data.querySelectorAll('.result-title');
    const resultExcerpts = data.querySelectorAll('.result-excerpt');
    // const resultUrls = data.querySelectorAll('.result a');

    if (resultTitles.length === 0) {
      message.channel.send('No results found.');
      return;
    }

    const resultCount = Math.min(5, resultTitles.length);

    const embed = new Discord.MessageEmbed()
      .setAuthor(`Search results for ${args}`, client.user.avatarURL())
      .setColor('#6F39B0')
      .setDescription('I found the following results:')
      .setTimestamp(message.createdAt)
      .setFooter(`mdn | ${message.author.tag}`);

    for (let i = 0; i < resultCount; i += 1) {
      const title = resultTitles[i].innerHTML;
      const excerpt = resultExcerpts[i].innerHTML.replace(/<[^>]*>?/gm, '');
      const resultURL =
        `https://developer.mozilla.org/${resultTitles[i].getAttribute('href')}`;

      embed.addField(title, `${excerpt}\n${resultURL}`);
    }

    message.channel.send(embed);
  },
};
