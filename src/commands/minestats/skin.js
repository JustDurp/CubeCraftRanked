/**
 * @file test.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');

class Skin extends Command {

    constructor(client) {
        super(client, {
            name: 'skin',
            description: 'Shows the skin of a minecraft player!',
            category: 'minestats'
        });

    }

    async run(message, args) {

        const { UsernameToUUID, SkinRendered } = require("../../api/api")
        if (!args[0]) return message.channel.send(new MessageEmbed().setDescription("**Hmm... who are you trying to search?**").setColor("RED"));

        UsernameToUUID(args[0]).then(async(info) => {
            SkinRendered(info.id).then(async(skin) => {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${info.name}'s skin`)
                    .setURL(skin)
                    .setColor("GREEN")
                    .setImage(skin))
                console.log(info, skin)

            })
        }).catch(async(err) => {
            return message.channel.send(new MessageEmbed().setDescription("**Hmm... who are you trying to search?**").setColor("RED"));
        })
    }

}

// Module Exports
module.exports = Skin