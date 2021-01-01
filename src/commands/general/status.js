/**
 * @file ping.js
 */

// Library
const { Command } = require('../../api/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
    // Ping
class Status extends Command {

    constructor(client) {
        super(client, {
            name: `status`,
            description: `Pong!`,
            category: `general`
        });
    }

    async run(message, args) {

        fetch('https://status.mojang.com/check')
            .then(res => res.json())
            .then(json => {
                var status;
                if (json.minecraft.net == 'green') status = '<a:check:722817478119653458>';
                let dc = '<a:check:722817478119653458>';
                if (!dc) return;

                message.channel.send(new MessageEmbed().setDescription(`Minecraft: ${status}\nDiscord: ${dc}`))
            })
    }

}

// Module Exports
module.exports = Status;