const { permissionType, commandType } = require('../../lib/permissions');

const { getCommands } = require('../index');
const { hasPermission } = require('../../lib/utils');

module.exports = {
  name: 'help',
  aliases: ['h'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'help',
  handler({ Discord, client, message }) {
    const embed = new Discord.MessageEmbed()
      .setAuthor('Help')
      .setThumbnail(client.user.avatarURL())
      .setColor('#6F39B0');

    Object.values(commandType).forEach((c) => {
      embed.addField(c.name, `${c.description}\n`);
    });

    getCommands().forEach((command) => {
      if (embed.fields.find((f) => f.name === command.type).value.split('\n')[1].includes(command.name)) return;

      if (hasPermission({ author: message.author, member: message.member }, command)) {
        if (embed.fields.find((f) => f.name === command.type).value
            !== `${Object.values(commandType).find((c) => c.name === command.type).description}\n`
        ) embed.fields.find((f) => f.name === command.type).value += ', ';

        embed.fields.find((f) => f.name === command.type).value
          += `**${command.name}**${command.aliases.length > 0 ? ` (${command.aliases.join(', ')})` : ''}`;
      }
    });

    embed.fields = embed.fields
      .filter((field) => field.value !== `${Object.values(commandType).find((t) => t.name === field.name).description}\n`);

    message.channel.send(embed);
  },
};

// TODO: filter the commands list by category
