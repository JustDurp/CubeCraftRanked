/**
 * @file slush.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');

class Slush extends Command {

    constructor(client) {
        super(client, {
            name: 'slush',
            description: 'Fun message :)',
            category: 'fun'
        });


    }

    async run(message, args) {

        message.channel.send(new MessageEmbed().setDescription(`Slushies for @everyone! <:slushie:721861021848830002>`).setColor("#f700eb"))

    }

}

// Module Exports
module.exports = Slush