/**
 * @file dog.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');
const fetch = require(`node-fetch`);
const { dog } = require('../../api/api');

class Dog extends Command {

    constructor(client) {
        super(client, {
            name: 'dog',
            description: "Shows a picture of a dog",
            category: 'fun'
        });


    }

    async run(message, args) {

        dog().then(async(info) => {

            let embed = new MessageEmbed()
                .setColor("#08aac6")
                .setAuthor(`Dog`)
                .setImage(info.message)
                .setTimestamp()
    
            message.channel.send(embed)
    
    
        })

    }

}

// Module Exports
module.exports = Dog