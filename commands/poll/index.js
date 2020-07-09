const { permissionType, commandType } = require('../../lib/permissions');
const { addPoll, clearPoll, getPoll } = require('../../store/poll');
const { mstoTime } = require('../../lib/utils');

const formatChoices = (choices) =>
  choices.map((choice, idx) => `${idx + 1} - ${choice}`).join('\n');

const getWinnerIdx = (arr) =>
  arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();

module.exports = {
  name: 'poll',
  aliases: ['newpoll'],
  type: commandType.base.name,
  permissions: permissionType.user,
  async handler({ Discord, message, args }) {
    // check if there is a poll
    if (getPoll()) return message.reply('There is a poll in action !');
    args = args.join(' ').split('-');

    // get params
    const pollDuration = +args[0];
    const pollTitle = args[1];
    const pollChoices = args[2] ? args[2].split(',') : [];

    // validate
    if (!pollDuration) return message.reply('Invalid duration !');
    if (!pollTitle) return message.reply('Invalid title !');
    if (pollChoices.length < 2)
      return message.reply('Poll choices must be at least 2 !');

    // create the poll
    addPoll({ title: pollTitle, choices: pollChoices });
    const embed = new Discord.MessageEmbed()
      .setAuthor(pollTitle)
      .setColor('#6F39B0')
      .setDescription(formatChoices(pollChoices))
      .addField('Poll will end after', mstoTime(pollDuration * 1000))
      .setTimestamp(message.createdAt);
    message.channel.send(embed);

    // wait for the poll to end
    return setTimeout(() => {
      // get the poll info and clear it
      const poll = getPoll();
      const choices = Object.values(poll.votes);
      clearPoll();

      // check if there are votes
      if (!choices.length)
        return message.channel.send(
          `:hourglass_flowing_sand: The poll **"${poll.title}"** ended, there's no winner`
        );

      // get the winner choice and announce it
      const winnerChoice = poll.choices[getWinnerIdx(choices)];
      const embed = new Discord.MessageEmbed()
        .setAuthor(`The poll "${poll.title}" ended`)
        .setColor('#6F39B0')
        .setDescription(
          `:partying_face: The choice **"${winnerChoice}"** won the poll !`
        )
        .setTimestamp(message.createdAt);
      return message.channel.send(embed);
    }, pollDuration * 1000);
  },
};
