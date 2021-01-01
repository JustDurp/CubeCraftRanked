/**
 * @file test.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');
const { readdirSync } = require("fs");
const { prefix } = require('../../api/Storage');
const { resolve, join } = require('path');
// Help
class Help extends Command {

    constructor(client) {
        super(client, {
            name: 'help',
            description: 'Help Command',
            category: 'general',
        });

        this.dir = resolve('./src/commands')
    }

    async run(message, args) {

        let generalCategory = this.client.commands.filter((a) => a.pull.category === 'general');
        let moderationCategory = this.client.commands.filter((a) => a.pull.category === 'minestats');
        let adminCategory = this.client.commands.filter((a) => a.pull.category === 'fun');
        let tourCategory = this.client.commands.filter((a) => a.pull.category === 'tournaments')
        let helpMenu = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTitle(`**Help menu**`)
            .setDescription(`Available commands for **${this.client.user.tag}**. \nThe bot prefix is at the moment **${prefix}**. \n"<>" is required and "()" is optional!`)
            .addFields([{
                    name: `**📘 General commands**`,
                    value: `General commands for users`
                },
                {
                    name: `**📜 Minestats commands**`,
                    value: `Minecraft stats commands`
                },
                {
                    name: `**🦺 Fun commands**`,
                    value: `Some fun commands :)`
                },
                {
                    name: '**📎 Tournament and ticket commands**',
                    value: 'Tournament Stats & Ticket commands'
                }
            ])
            .setTimestamp()
            .setFooter(this.client.user.username);
        let helpGeneral = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`**📘 General commands**`)
            .setTimestamp()
            .setFooter(this.client.user.username);
        let helpModeration = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`**📜 Minestats commands**`)
            .setTimestamp()
            .setFooter(this.client.user.username);
        let helpAdmin = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`**🦺 Fun commands**`)
            .setTimestamp()
            .setFooter(this.client.user.username);
        let helpTour = new MessageEmbed()
            .setColor("GREEN")
            .setTitle('**📎 Tournament and Ticket commands**')
            .setTimestamp()
            .setFooter(this.client.user.username);
        generalCategory.forEach((com) => {
            helpGeneral.addField(`${com.pull.name} - ${com.pull.description}`, `${prefix}${com.pull.name} ${com.pull.usage || ''}`);
        });
        moderationCategory.forEach((com) => {
            helpModeration.addField(`${com.pull.name} - ${com.pull.description}`, `${prefix}${com.pull.name} ${com.pull.usage || ''}`);
        });
        adminCategory.forEach((com) => {
            helpAdmin.addField(`${com.pull.name} - ${com.pull.description}`, `${prefix}${com.pull.name} ${com.pull.usage || ''}`);
        });
        tourCategory.forEach((com) => {
            helpTour.addField(`${com.pull.name} - ${com.pull.description}`, `${prefix}${com.pull.name} ${com.pull.usage || ''}`)
        })
        let pages = [helpMenu, helpGeneral, helpModeration, helpAdmin, helpTour];
        let page = 1;
        message.delete();
        message.channel.send(helpMenu).then(async(m) => {
            await m.react('📘');
            await m.react('📜');
            await m.react('🦺');
            await m.react('📎')
            await m.react('🏡');
            await m.react('❌');
            let generalFilter = (reaction, user) => reaction.emoji.name === '📘' && user.id === message.author.id;
            let moderationFilter = (reaction, user) => reaction.emoji.name === '📜' && user.id === message.author.id;
            let adminFilter = (reaction, user) => reaction.emoji.name === '🦺' && user.id === message.author.id;
            let tourFilter = (reaction, user) => reaction.emoji.name === '📎' && user.id === message.author.id
            let homeFilter = (reaction, user) => reaction.emoji.name === '🏡' && user.id === message.author.id;
            let stopFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let generalCollector = m.createReactionCollector(generalFilter, { time: 60000 });
            let moderationCollector = m.createReactionCollector(moderationFilter, { time: 60000 });
            let adminCollector = m.createReactionCollector(adminFilter, { time: 60000 });
            let tourCollector = m.createReactionCollector(tourFilter, { time: 60000 })
            let homeCollector = m.createReactionCollector(homeFilter, { time: 60000 });
            let stopCollector = m.createReactionCollector(stopFilter, { time: 60000 });
            generalCollector.on('collect', (r) => {
                page = 2;
                m.edit(pages[page - 1]);
                r.users.remove(message.author.id);
            });
            moderationCollector.on('collect', (r) => {
                page = 3;
                m.edit(pages[page - 1]);
                r.users.remove(message.author.id);
            });
            adminCollector.on('collect', (r) => {
                page = 4;
                m.edit(pages[page - 1]);
                r.users.remove(message.author.id);
            });

            tourCollector.on('collect', (r) => {
                page = 5;
                m.edit(pages[page - 1]);
                r.users.remove(message.author.id);
            });
            homeCollector.on('collect', (r) => {
                page = 1;
                m.edit(pages[page - 1]);
                r.users.remove(message.author.id);
            });
            stopCollector.on('collect', (r) => {
                m.delete();
            });
        });

    }

}

// Module Exports
module.exports = Help;