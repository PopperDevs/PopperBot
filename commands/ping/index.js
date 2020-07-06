module.exports = {
  name: 'ping',
  aliases: ['p', 'pong'],
  template: 'ping',
  handler({ Discord, client, message }) {
    message.channel.send('Pinging...')
      .then((m) => {
        const embed = new Discord.MessageEmbed()
          .setAuthor('Latency', client.user.avatarURL())
          .setColor('#6F39B0')
          .setDescription(`Client : **${m.createdTimestamp - message.createdTimestamp}**ms\nAPI : **${client.ws.ping}**ms\n`);
        m.edit('Pong ! 🏓', embed);
      });
  },
};
