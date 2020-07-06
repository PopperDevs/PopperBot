const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'ping',
  aliases: ['p', 'pong'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'ping',
  async handler({ Discord, client, message }) {
    const m = await message.channel.send('Pinging...');
    const embed = new Discord.MessageEmbed()
      .setAuthor('Latency', client.user.avatarURL())
      .setColor('#6F39B0')
      .setDescription(`Client : **${m.createdTimestamp - message.createdTimestamp}**ms\nAPI : **${client.ws.ping}**ms\n`);
    m.edit('Pong ! 🏓', embed);
  },
};
