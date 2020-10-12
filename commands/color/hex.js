const { permissionType, commandType } = require('../../lib/permissions');
const { syntaxErrorMessage, validMessage } = require('../../lib/responseHandler');

module.exports = {
  name: 'hex',
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'hex <value>',
  handler({
    Discord, client, message, args,
  }) {
    let colorValue = args[0];
    const colorRegex = /^([0-9a-f]{3}){1,2}$/i;

    if (colorValue !== 'random' && !colorRegex.test(colorValue)) return syntaxErrorMessage(Discord, message, this);

    if (colorValue === 'random') colorValue = Math.random().toString(16).slice(2, 8);
    if (colorValue.length === 3) colorValue = [...colorValue].map((x) => x + x).join('');

    return validMessage({
      Discord,
      client,
      message,
      command: this,
      color: `#${colorValue}`,
      title: `#${colorValue}`,
      thumbnail: `https://via.placeholder.com/150/${colorValue}?text=+`,
      fields: [['RGB', `${
        parseInt(colorValue.slice(0, 2), 16)
      }, ${
        parseInt(colorValue.slice(2, 4), 16)
      }, ${
        parseInt(colorValue.slice(4), 16)
      }`]],
    });
  },
};
