const { permissions } = require('./permissions');

module.exports = {
  hasPermission({ user, author, member }, command) {
    return (
      (permissions[user ? user.id : author.id] || 0)
      >= (command.permissions ? command.permissions.value : command.parent.permissions.value)
    )
    && (
      !member
      || (command.guildPermissions || []).every((perm) => member.hasPermission(perm))
    );
  },
};
