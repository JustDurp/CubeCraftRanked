/**
 * @file test.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');
const fetch = require("node-fetch");
const ms = require("ms")

class Userinfo extends Command {

    constructor(client) {
        super(client, {
            name: 'userinfo',
            description: 'Shows information about a Minecraft user!',
            category: 'minestats'
        });

    }

    async run(message, args) {

        const { UsernameToUUID, HeadAvatar, UserHistory, UUIDToUsername } = require("../../api/api");

        if (!args[0]) return message.channel.send(new MessageEmbed().setDescription("**Hmm... who are you trying to search?**").setColor("RED"));

        UsernameToUUID(args[0]).then(async(info) => {

            const head = await HeadAvatar(info.id);
            const bInfo = await UUIDToUsername(info.id)

            message.channel.send(new MessageEmbed()
                .setColor("GREEN")
                .setThumbnail(head)
                .setTitle(`**${info.name}'s information**`)
                .addFields([
                    { name: `**Username**`, value: info.name, inline: true },
                    { name: `**UUID**`, value: info.id, inline: true },
                    { name: `**Last namechange**`, value: `${bInfo.changedToAt ? ms(Date.now() - bInfo.changedToAt) + ' ago' : 'Never changed'}` }
                ])
                .setTimestamp()
            )

        }).catch(async(err) => {
            return await message.channel.send(new MessageEmbed().setDescription("**Hmm... who are you trying to search?**").setColor("RED"));
        })

    }

}

// Module Exports
module.exports = Userinfo