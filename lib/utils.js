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
  mstoTime(s) {
    let x = s;
    const ms = x % 1000;
    x = (x - ms) / 1000;
    const secs = x % 60;
    x = (x - secs) / 60;
    const mins = x % 60;
    x = (x - mins) / 60;
    const hrs = x % 24;
    x = (x - hrs) / 24;
    const days = x;
    return `${days ? `**${days}**\`d\`` : ''}${hrs ? `**${hrs}**\`h\`` : ''}${mins ? `**${mins}**\`mn\`` : ''}${secs ? `**${secs}**\`s\`` : ''}${ms ? `**${ms}**\`ms\`` : ''}`;
  },
};
