const { permissionType, commandType } = require('../../lib/permissions');
const { vote, getPoll } = require('../../store/poll');

function validateVote({ poll, userId, voteIdx }) {
  if (!poll) return 'No polls in action !';
  if (poll.votes[userId] !== undefined) return 'You already voted !';
  if (voteIdx < 0 || voteIdx >= poll.choices.length)
    return 'Invalid choice number !';
  return true;
}

module.exports = {
  name: 'vote',
  aliases: ['vote'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'vote <choice number>',
  handler({ Discord, message, args }) {
    const poll = getPoll();
    const voteIdx = +args.join(' ') - 1;
    const userId = message.author.id;

    const validation = validateVote({ poll, userId, voteIdx });
    if (validation !== true)
      return message.channel.send(
        new Discord.MessageEmbed().setColor('#FF9AA2').setTitle(validation)
      );

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
