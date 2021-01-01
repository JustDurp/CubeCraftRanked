/**
 * @file test.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');
const { ServerStats } = require("../../api/api")

class Serverinfo extends Command {

    constructor(client) {
        super(client, {
            name: 'serverinfo',
            description: 'Shows the serverinformation about CubeCraft!',
            category: 'minestats'
        });


    }

    async run(message, args) {

        ServerStats("play.cubecraft.net").then(async(server) => {

            let info = new MessageEmbed()
                .setTitle(`play.cubecraft.net Stats`)
                .addField("Status:", `✅ Online`)
                .addField("Players:", `${server.players.online}/${server.players.max}\n**${server.version}**`, true)
                .addField("MOTD:", '```' + server.motd.clean + '```')
                .setColor("GREEN")
                .setTimestamp()

            message.channel.send(info);

        }).catch(async(err) => {
            return message.channel.send(new MessageEmbed().setTitle("Cubecraft is currently offline!").setColor("RED"));
        })

    }

}

// Module Exports
module.exports = Serverinfo