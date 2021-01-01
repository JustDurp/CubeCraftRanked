/**
 * @file avatar.js
 */

// Library
const { Command } = require('../../api/Command');

// Avatar
class Avatar extends Command {

    constructor(client) {
        super(client, {
            name: `avatar`,
            usage: `<id | mention>`,
            description: `Displays user avatar`,
            aliases: [`pfp`, `profilepicture`, 'av'],
            category: `general`
        });
    }

    async run(message, args, langpack) {

        let member = this.client.functions.getMember(message, args[0]);

        message.channel.send({
            embed: {
                color: 'PURPLE',
                title: `${member ? member.user.tag : message.author.tag}'s avatar`,
                image: {
                    url: `${member ? member.user.avatarURL({ size: 4096, dynamic: true }) : message.author.displayAvatarURL({ size: 4096, dynamic: true })}`
                },
                timestamp: Date.now(),
                footer: {
                    text: this.client.user.username
                }
            }
        });

    }

}

// Module Exports
module.exports = Avatar;