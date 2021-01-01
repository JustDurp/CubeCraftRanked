/**
 * @file history.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');
const ms = require("ms");
const { Functions } = require('../../api/Functions');

class History extends Command {

    constructor(client) {
        super(client, {
            name: 'marry',
            description: 'Marry someone :smirk:',
            category: 'marry'
        });


    }

    async run(message, args) {
        const { con } = require('../../app');
        var mention = message.guild.member(message.mentions.users.first() || args[0] || message.author);
        con.query(`SELECT * FROM marry WHERE userid = '${message.author.id}'`, (err, row) => {
            if (!args[0]) {
                if (row[0].married == 'no') return message.channel.send(new MessageEmbed().setDescription(`${message.author} you are single forever`))
                var marriedWith = message.guild.member(row.marriedWith)
                if (!marriedWith) return message.channel.send(new MessageEmbed().setDescription(`${message.author} is single forever`))
                return;
            }

            if (args[0] || message.mentions.users.first()) {
                var user = message.guild.member(message.mentions.users.first() || args[0]);
                if (user.user.id == message.author) return message.channel.send(new MessageEmbed().setDescription(`You can't marry yourself.. you may love yourself a bit too much..`));
                if (row[0].married === 'yes') return message.channel.send(new MessageEmbed().setDescription(`YOU ARE ALREADY MARRIED!!!! DONT CHEAT!!!`))
                const user2 = con.query(`SELECT * FROM marry WHERE userid = '${user.user.id}'`);
                if(user2.row.married == 'yes') return message.channel.send(new MessageEmbed().setDescription(`${user} is already married.. I'm so sorry..`))
        
        }
        })
}

}

// Module Exports
module.exports = History