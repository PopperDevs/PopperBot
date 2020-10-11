const { permissionType, commandType } = require('../../lib/permissions');
const { validMessage, syntaxErrorMessage } = require('../../lib/responseHandler');

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

module.exports = {
  name: '8ball',
  aliases: ['8b'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: '8ball <question>',
  async handler({
    Discord, client, message, args
  }) {
    if (args.length === 0) {
      syntaxErrorMessage(Discord, message, this);
      return;
    }

    const randomNum = Math.floor(Math.random() * (answers.length - 1));
    const selectedAnswer = answers[randomNum];

    validMessage({
      Discord,
      client,
      message,
      command: this,
      description: `🎱 ${selectedAnswer} 🎱`,
      author: args.join(' '),
    });
  },
};
