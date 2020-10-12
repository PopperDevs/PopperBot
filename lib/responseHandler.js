module.exports = {
  validMessage({
    Discord, client, message, command, color = '#6F39B0', author = '', title = '', description = '', thumbnail = '', fields = [],
  }) {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setAuthor(author, client.user.avatarURL())
      .setFooter(`${command.parent?.name || ''} ${command.name} | ${message.author.tag}`)
      .setTimestamp(message.createdAt)
      .setTitle(title)
      .setDescription(description)
      .setThumbnail(thumbnail);
    fields.forEach(([label, value, inline = true]) => embed.addField(label, value, inline));
    return message.channel.send(embed);
  },
  syntaxErrorMessage(Discord, message, command, suffix = '') {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#FF9AA2')
        .setFooter(`${command.parent?.name || ''} ${command.name} | ${message.author.tag}`)
        .setTimestamp(message.createdAt)
        .setAuthor('⚠️ Incorrect syntax! ⚠️')
        .setTitle(
          `Correct usage of this command:\n\`${process.env.PREFIX}${
            command.parent
              ? `${command.parent.template} `
              : ''
          }${command.template}${suffix}\``,
        ),
    );
  },
  errorMessage(Discord, message, command, args, error = 'An error occurred, please contact a manager.') {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#FF9AA2')
        .setFooter(`${command.parent?.name || ''} ${command.name} | ${message.author.tag}`)
        .setTimestamp(message.createdAt)
        .setAuthor('⚠️ Error! ⚠️')
        .setTitle(`${process.env.PREFIX}${command.parent ? `${command.parent.name} ` : ''}${command.name} ${args.join(' ')}`)
        .setDescription(error),
    );
  },
  unAuthorizedCommand(Discord, message, command) {
    const embed = new Discord.MessageEmbed()
      .setColor('#FF9AA2')
      .setFooter(`${command.parent?.name || ''} ${command.name} | ${message.author.tag}`)
      .setTimestamp(message.createdAt)
      .setAuthor('🛑 UnAuthorized! 🛑')
      .setTitle(`You do not have the permission to\nexecute the following command :\n\`${process.env.PREFIX}${
        command.parent
          ? `${command.parent.name} `
          : ''
      }${command.name}\``);

    const botPerms = `${command.parent?.permissions?.name || ''}\n${command.permissions?.name || ''}`.trim();
    if (botPerms !== '') embed.addField('Bot permissions', botPerms, true);

    const guildPerms = (command.parent?.guildPermissions || [])
      .concat(command.guildPermissions || [])
      .join('\n').trim();
    if (guildPerms !== '') embed.addField('Guild permissions', guildPerms, true);

    return message.channel.send(embed);
  },
};
