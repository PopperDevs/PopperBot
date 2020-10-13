/* eslint-disable no-empty */
/* eslint-disable no-return-assign */
/* eslint-disable no-cond-assign */
const moment = require('moment');

const { permissions } = require('./permissions');

module.exports = {
  hasPermission({ user, author, member }, command) {
    return (
      (permissions[user ? user.id : author.id] || 0)
        >= (command.permissions
          ? command.permissions.value
          : command.parent.permissions.value)
      && (!member
        || (command.guildPermissions || []).every((perm) => member.hasPermission(perm)))
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
    return `${days ? `**${days}**\`d\`` : ''}${hrs ? `**${hrs}**\`h\`` : ''}${
      mins ? `**${mins}**\`mn\`` : ''
    }${secs ? `**${secs}**\`s\`` : ''}${ms ? `**${ms}**\`ms\`` : ''}`;
  },
  parseTime(string) {
    if (!string.match(/\d+\w/g)) {
      return null;
    }
    const arr = string.match(/\d+\w/g).map((x) => moment.duration(/(\d+)(\w)/.exec(x)[1], /(\d+)(\w)/.exec(x)[2]));
    for (let i = 1; i < arr.length; i += 1) {
      arr[0].add(arr[i]);
    }
    return {
      millis: arr[0].asMilliseconds(),
      parsed: arr[0].humanize(),
    };
  },
  async getUser(message, s) {
    let tempU;
    try {
      if ((tempU = message.mentions.users.first())) return tempU;
      if (
        await (async () => {
          try {
            return (tempU = await message.guild.members.fetch(s));
          } catch (e) {
            return null;
          }
        })()
      ) {
        return tempU.user;
      }
      if (
        (tempU = (
          await message.guild.members.fetch({
            query: s,
            limit: 1,
          })
        ).first())
      ) {
        return tempU.user;
      }
    } catch (e) {}
    return null;
  },
  async getRole(message, s) {
    let tempR;
    try {
      if ((tempR = message.mentions.roles.first())) {
        return tempR;
      }
      if (
        await (async () => {
          try {
            return (tempR = await message.guild.roles.fetch(s));
          } catch (e) {
            return null;
          }
        })()
      ) {
        return tempR;
      }
      if ((tempR = message.guild.roles.cache.find((x) => x.name === s))) {
        return tempR;
      }
    } catch (e) {}
    return null;
  },
};
