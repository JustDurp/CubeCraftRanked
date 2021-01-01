/**
 * @file test.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');

// Test
class Test extends Command {

    constructor(client) {
        super(client, {
            name: 'test',
            description: 'Test command',
            category: 'developer'
        });


    }

    async run(message, args) {

        this.client.emit('guildMemberRemove', message.member);

    }

}

// Module Exports
module.exports = Test;