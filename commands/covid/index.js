const fetch = require('node-fetch');
const { permissionType, commandType } = require('../../lib/permissions');

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = {
  name: 'covid',
  aliases: [],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'covid',
  async handler({ Discord, client, message }) {
    const { data, dt } = await (
      await fetch('https://covid2019-api.herokuapp.com/v2/total')
    ).json();

    const embed = new Discord.MessageEmbed()
      .setAuthor('COVID-19 Information', client.user.avatarURL())
      .setColor('#6F39B0')
      .addField(`updated at ${dt}`, '\u200b')
      .addField('😷  Confirmed', formatNumber(data.confirmed))
      .addField('💀  Deaths', formatNumber(data.deaths))
      .addField('✅  Recoverd', formatNumber(data.recovered))
      .setTimestamp(message.createdAt)
      .setFooter(`covid | ${message.author.tag}`);

    message.channel.send(embed);
  },
};
