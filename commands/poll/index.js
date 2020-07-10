const { permissionType, commandType } = require('../../lib/permissions');
const { addPoll, clearPoll, getPoll } = require('../../store/poll');
const { mstoTime } = require('../../lib/utils');

function formatChoices(choices) {
  return choices.map((choice, idx) => `${idx + 1} - ${choice}`).join('\n');
}

function getWinnerIdx(arr) {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
}

function validatePoll({ pollDuration, pollTitle, pollChoices }) {
  if (!pollDuration) return 'Invalid duration !';
  if (!pollTitle) return 'Invalid title !';
  if (pollChoices.length < 2) return 'Poll choices must be at least 2 !';
  return true;
}

module.exports = {
  name: 'poll',
  aliases: ['newpoll'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'poll <duration (sec)> <title> <choices (comma separated)>',
  handler({ Discord, message, args }) {
    // check if there is a poll
    if (getPoll())
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#FF9AA2')
          .setTitle('There is a poll in action !')
      );

    args = args.join(' ').split('-');
    // get params
    const pollDuration = +args[0];
    const pollTitle = args[1];
    const pollChoices = args[2] ? args[2].split(',') : [];

    // validate
    const validation = validatePoll({ pollDuration, pollTitle, pollChoices });
    if (validation !== true)
      return message.channel.send(
        new Discord.MessageEmbed().setColor('#FF9AA2').setTitle(validation)
      );

    // create the poll
    addPoll({ title: pollTitle, choices: pollChoices });
    const embed = new Discord.MessageEmbed()
      .setAuthor(pollTitle)
      .setColor('#6F39B0')
      .setDescription(formatChoices(pollChoices))
      .addField('Poll will end after', mstoTime(pollDuration * 1000))
      .setFooter(`poll | ${message.author.tag}`)
      .setTimestamp(message.createdAt);
    message.channel.send(embed);

    // wait for the poll to end
    setTimeout(() => {
      // get the poll info and clear it
      const poll = getPoll();
      const choices = Object.values(poll.votes);
      clearPoll();

      // get the winner choice and announce it
      const winnerChoice = poll.choices[getWinnerIdx(choices)];
      const winnerMsg = winnerChoice
        ? `🥳 The choice **"${winnerChoice}"** won the poll !`
        : "There's no winner";
      const embed = new Discord.MessageEmbed()
        .setAuthor(`⏳ The poll "${poll.title}" ended`)
        .setColor('#6F39B0')
        .setDescription(winnerMsg)
        .setFooter(`poll | ${message.author.tag}`)
        .setTimestamp(message.createdAt);
      return message.channel.send(embed);
    }, pollDuration * 1000);
  },
};
