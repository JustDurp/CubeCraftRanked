/**
 * @file history.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');
const { UsernameToUUID, HeadAvatar, UserHistory } = require("../../api/api");
const ms = require("ms");

class History extends Command {

    constructor(client) {
        super(client, {
            name: 'history',
            description: 'Shows the skin of a minecraft player!',
            category: 'minestats'
        });


    }

    async run(message, args) {

        if (!args[0]) return message.channel.send(new MessageEmbed().setDescription("**Hmm... who are you trying to search?**").setColor("RED"));

        UsernameToUUID(args[0]).then(async(info) => {
            HeadAvatar(info.id).then(async(head) => {
                UserHistory(info.id).then(async(history) => {
                    let mappedHistory = history.map((v) => {
                        return `**${v.name}** (${v.changedToAt ? ms(Date.now() - v.changedToAt) + ' ago' : 'first'})`;

                    });

                    message.channel.send(new MessageEmbed()
                        .setTitle(`Name History ${info.name}`)
                        .setThumbnail(head)
                        .setDescription(mappedHistory.reverse().join('\n'))
                        .setColor("GREEN"))
                })


            })
        }).catch(async(err) => {
            return message.channel.send(new MessageEmbed().setDescription("**Hmm... who are you trying to search?**").setColor("RED"));
        })

    }

}

// Module Exports
module.exports = History