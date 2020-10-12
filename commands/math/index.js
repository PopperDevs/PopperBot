const { evaluate } = require('mathjs');
const { permissionType, commandType } = require('../../lib/permissions');
const { validMessage, errorMessage } = require('../../lib/responseHandler');

module.exports = {
  name: 'math',
  aliases: ['m', 'calc'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'math',
  handler({
    Discord, client, args, message,
  }) {
    const s = args.join(' ').trim();
    if (!s) return errorMessage(Discord, message, this, args, 'You need to provide an expression to evaluate.');
    try {
      const result = evaluate(s);
      return validMessage({
        Discord,
        client,
        message,
        command: this,
        fields: [
          [s, `\`\`\`\n${result}\n\`\`\``],
        ],
      });
    } catch (e) {
      return errorMessage(Discord, message, this, args, e);
    }
  },
};
