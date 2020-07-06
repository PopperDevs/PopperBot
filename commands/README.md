## Command Helper

This folder contains every command for the bot.
Each command has its own folder, and an `index.js` in it.
If a command contains a subcommand, a file with the subcommand name is created inside the folder.

Here is a template for a command :
```js
const { permissionType, commandType } = require('../../lib/permissions');

module.exports = {
  name: 'example',
  aliases: ['alias1', 'alias2'],
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'example',
  handler({ Discord, client, message, args }) {
    message.channel.send('This is an example command.');
  },
};
```