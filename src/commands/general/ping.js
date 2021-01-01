/**
 * @file ping.js
 */

// Library
const { Command } = require('../../api/Command');
const { MessageEmbed } = require('discord.js');

// Ping
class Ping extends Command {

    constructor(client) {
        super(client, {
            name: `ping`,
            description: `Pong!`,
            category: `general`
        });
    }

    async run(message, args) {

        let pendingPing = new MessageEmbed()
            .setColor('ORANGE')
            .setDescription(`Pending...`)
            .setTimestamp()
            .setFooter(this.client.user.username);

        let msg = await message.channel.send(pendingPing);

        msg.edit(new MessageEmbed().setColor('PURPLE').setDescription(`🌍 Roundtrip took ${msg.createdTimestamp - message.createdTimestamp}ms (Client: ${this.client.ws.ping}ms)`));

    }

}

// Module Exports
module.exports = Ping;