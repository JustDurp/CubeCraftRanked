/**
 * @file Functions.js
 */

// Functions
class Functions {

    getMember(message, input) {
        let member = message.guild.member(message.mentions.users.first() || input);
        if (!member && input) member = message.guild.members.cache.find((member) => member.user.username.toLowerCase() === input.toLowerCase());
        return member;
    }

}

// Module Exports
module.exports = { Functions };