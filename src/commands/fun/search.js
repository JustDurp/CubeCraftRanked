/**
 * @file search.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');

class Search extends Command {

    constructor(client) {
        super(client, {
            name: 'search',
            description: 'Google something',
            category: 'fun'
        });


    }

    async run(message, args) {

        const noArgs = new MessageEmbed()
            .setDescription("**+search**\n\n**Examples:**\n+search food")
            .setTimestamp()
            .setColor("RED")
        if (!args[0]) return message.channel.send(noArgs)
        if (args[0]) {
            const link = `https://www.google.com/search?q=${args.join('+')}`

            const linkembed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Click here to go to the google page!`)
                .setURL(link)
                .setFooter(`Searched: ${args.join(' ')}`)
                .setColor('#0099ff')
                .setTimestamp()
            message.channel.send(linkembed)
        }

    }

}

// Module Exports
module.exports = Search