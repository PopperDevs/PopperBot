const { permissionType, commandType } = require('../../lib/permissions');
const { addPoll, vote, getPoll } = require('../../store/poll');

module.exports = {
  name: 'vote',
  type: commandType.base.name,
  permissions: permissionType.user,
  aliases: ['vote'],
  handler({ Discord, message, args }) {
    const poll = getPoll();
    const voteIdx = +args.join(' ') - 1;
    const userId = message.author.id;

    if (!poll) return message.reply('No polls in action !');
    if (poll.votes[userId] !== undefined)
      return message.reply('You already voted !');
    if (voteIdx < 0 || voteIdx >= poll.choices.length)
      return message.reply('Invalid choice number !');

    vote({ id: userId, choiceIdx: voteIdx });

    const embed = new Discord.MessageEmbed()
      .setAuthor('Voted Successfully')
      .setColor('#6F39B0')
      .setDescription(`You voted for **"${poll.choices[voteIdx]}"**`)
      .setFooter(`vote | ${message.author.tag}`)
      .setTimestamp(message.createdAt);
    return message.reply(embed);
  },
};
