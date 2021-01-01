/**
 * @file test.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');

// Test
class ticketEmbed extends Command {

    constructor(client) {
        super(client, {
            name: 'ticketembed',
            description: 'Test command',
            category: 'developer'
        });


    }

    async run(message, args) {
        message.delete();
        message.channel.send(new MessageEmbed().setDescription('Click on the 🎟️ to open a ticket!').setColor('BLUE')).then((msg)=>{
            msg.react('🎟️')
        })
    }

}

// Module Exports
module.exports = ticketEmbed;