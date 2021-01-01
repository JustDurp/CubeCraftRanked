/**
 * @file cat.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');
const fetch = require(`node-fetch`)
const { cat } = require("../../api/api")

class Cat extends Command {

    constructor(client) {
        super(client, {
            name: 'cat',
            description: 'Shows a picture of a cat',
            category: 'fun'
        });


    }

    async run(message, args) {

        cat().then(async(info) => {

            let embed = new MessageEmbed()
                .setColor("#08aac6")
                .setAuthor(`Cat`)
                .setImage(info[0].url)
                .setTimestamp()

            message.channel.send(embed)

        })
    }

}

// Module Exports
module.exports = Cat;