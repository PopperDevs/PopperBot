const { permissionType, commandType } = require('../../lib/permissions');
const { syntaxErrorMessage, validMessage } = require('../../lib/responseHandler');

module.exports = {
  name: 'rgb',
  type: commandType.base.name,
  permissions: permissionType.user,
  template: 'rgb <red> <green> <blue>',
  handler({
    Discord, client, message, args,
  }) {
    let colorValue = args;
    if (colorValue[0] !== 'random'
      && !colorValue.every((x) => +x >= 0
      && +x <= 255)) return syntaxErrorMessage(Discord, message, this);

    if (colorValue[0] === 'random') {
      colorValue = Array.from(
        { length: 3 },
        () => Math.floor(256 * Math.random()),
      );
    }

    const hexCode = colorValue.reduce(
      (string, value) => string + (+value).toString(16).padStart(2, 0).toUpperCase(),
      '',
    );
    return validMessage({
      Discord,
      client,
      message,
      command: this,
      color: `#${hexCode}`,
      title: `RGB ${colorValue.join(', ')}`,
      thumbnail: `https://via.placeholder.com/150/${hexCode}?text=+`,
      fields: [['Hex', `#${hexCode}`]],
    });
  },
};
