const { permissionType, commandType } = require('../../lib/permissions');

const packageJSON = require('../../package.json');

const { mstoTime } = require('../../lib/utils');

module.exports = {
  name: 'info',
  aliases: ['i'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'i',
  handler({ Discord, client, message }) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.tag, client.user.avatarURL())
      .setColor('#6F39B0')
      .setDescription(packageJSON.description)
      .setFooter(`info | ${message.author.tag}`)
      .setTimestamp(message.createdAt)
      .addField('Main', `**Created :** ${client.user.createdAt.toLocaleDateString()}\n**Owner :** ${client.users.cache.get(process.env.OWNER).tag}\n**Language :** Node.JS ${process.version} (discord.js ${packageJSON.dependencies['discord.js']})`, true)
      .addField('Stats', `**Users:** ${client.users.cache.size}\n**Guilds :** ${client.guilds.cache.size}\n**Channels :** ${client.channels.cache.size}\n**Version :** ${packageJSON.version}\n**Uptime :** ${mstoTime(client.uptime)}`, true);
    message.channel.send(embed);
  },
};
