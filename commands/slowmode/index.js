const { permissionType, guildPermissionType, commandType } = require('../../lib/permissions');
const { errorMessage, syntaxErrorMessage, validMessage } = require('../../lib/responseHandler');
const { parseTime } = require('../../lib/utils');

module.exports = {
  name: 'slowmode',
  aliases: ['slow'],
  type: commandType.mod.name,
  permissions: permissionType.mod,
  guildPermissions: [guildPermissionType.MANAGE_CHANNELS],
  template: 'slow <time>',
  async handler({
    Discord, client, message, args,
  }) {
    if (!message.guild) return errorMessage(Discord, message, this, args, 'This command can only be used in a guild.');
    if (args.length > 0) {
      const time = parseTime(args[0]) || (args[0] === 'off' ? { millis: 0 } : null);
      if (time) {
        await message.channel.setRateLimitPerUser(time.millis / 1000);
        return validMessage({
          Discord,
          client,
          message,
          command: this,
          description: `The${
            time.millis > 0
              ? ' new '
              : ' '
          }rate limit is now ${
            time.millis > 0
              ? `of ${
                time.millis >= 60000
                  ? time.parsed
                  : `${time.millis / 1000} second${
                    time.millis > 1000
                      ? 's'
                      : ''
                  }`
              }`
              : 'disabled'
          }.`,
        });
      }
    }
    return syntaxErrorMessage(Discord, message, this, { prefix: 'You need to specify a duration.' });
  },
};
