/**
 * @file slush.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');
const topics = require('../../api/topic.json')
class Topic extends Command {

    constructor(client) {
        super(client, {
            name: 'topic',
            description: 'Topics',
            category: 'fun',
            aliases: ["t"]
        });


    }

    async run(message, args) {
        message.channel.send(topics[Math.floor(Math.random() * topics.length)]);
    }

}

// Module Exports
module.exports = Topic;