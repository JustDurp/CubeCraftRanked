/**
 * @file test.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');

// Test
class Eval extends Command {

    constructor(client) {
        super(client, {
            name: 'say',
            description: 'Test command',
            category: 'developer'
        });


    }

    async run(message, args) {

        if (message.author.id === '281348487340359681') {
            message.delete()
            return message.channel.send(args.slice(0).join(" "));

        }else return;
    }

}

// Module Exports
module.exports = Eval;