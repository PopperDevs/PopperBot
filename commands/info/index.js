const { permissionType, commandType } = require('../../lib/permissions');

const packageJSON = require('../../package.json');

const { mstoTime } = require('../../lib/utils');
const { validMessage } = require('../../lib/responseHandler');

module.exports = {
  name: 'info',
  aliases: ['i'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'i',
  handler({ Discord, client, message }) {
    return validMessage({
      Discord,
      client,
      message,
      command: this,
      author: client.user.tag,
      description: packageJSON.description,
      thumbnail: client.user.displayAvatarURL(),
      fields: [
        ['Main', `**Created :** ${
          client.user.createdAt.toLocaleDateString()
        }\n**Owners :** [PopperDevs](https://github.com/PopperDevs)\n**Language :** Node.JS ${
          process.version
        }\n**Library :** Discord.JS ${
          packageJSON.dependencies['discord.js']
        }`],
        ['Stats', `**Users:** ${
          client.users.cache.size
        }\n**Guilds :** ${
          client.guilds.cache.size
        }\n**Channels :** ${
          client.channels.cache.size
        }\n**Version :** ${
          packageJSON.version
        }\n**Uptime :** ${
          mstoTime(client.uptime)
        }`],
      ],
    });
  },
};
