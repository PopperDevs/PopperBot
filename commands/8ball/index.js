const { parse } = require('node-html-parser');
const fetch = require('node-fetch');

const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: '8ball',
  aliases: ['eightball'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: '8ball',
  async handler({ Discord, client, message, args }) {
    if (args.length === 0) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#FF9AA2')
          .setTitle(
            `Incorrect syntax! Correct usage of this command: \`${process.env.PREFIX}${this.template} <question>\``
          )
      );
    }

    const answers = [
      'As I see it, yes.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      'Don’t count on it.',
      'It is certain.',
      'It is decidedly so.',
      'Most likely.',
      'My reply is no.',
      'My sources say no.',
      'Outlook not so good.',
      'Outlook good.',
      'Reply hazy, try again.',
      'Signs point to yes.',
      'Very doubtful.',
      'Without a doubt.',
      'Yes.',
      'Yes – definitely.',
      'You may rely on it.',
    ];

    const randomNum = Math.floor(Math.random() * (answers.length - 0) + 0);
    const selectedAnswer = answers[randomNum];

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${args.join(' ')}`, client.user.avatarURL())
      .setColor('#6F39B0')
      .setDescription(`🎱 ${selectedAnswer} 🎱`)
      .setTimestamp(message.createdAt)
      .setFooter(`8ball | ${message.author.tag}`);

    message.channel.send(embed);
  },
};
