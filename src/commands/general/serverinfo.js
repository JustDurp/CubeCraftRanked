/**
 * @file guildinfo.js
 */

// Library
const { Command } = require('../../api/Command');
const { MessageEmbed } = require('discord.js');

// GuildInfo
class GuildInfo extends Command {

    constructor(client) {
        super(client, {
            name: `guildinfo`,
            description: `Displays some information about the guild`,
            aliases: [`serverinfo`],
            category: `general`
        });
    }

    async run(message, args, langpack) {

        let guildGeneral = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(message.guild.iconURL())
            .setTitle('Guild Information')
            .setDescription('General Information')
            .addFields([
                { name: 'Guild Name', value: message.guild.name, inline: true },
                { name: 'Guild ID', value: message.guild.id, inline: true },
                { name: 'Owner', value: `<@${message.guild.ownerID}>`, inline: true },
                { name: 'Server Region', value: message.guild.region, inline: true },
                { name: 'Vanity URL', value: `${message.guild.vanityURLCode ? message.guild.vanityURLCode : 'Not available'}`, inline: true },
                { name: 'Shard ID', value: message.guild.shardID, inline: true }
            ])
            .setTimestamp()
            .setFooter(`${this.client.user.username} [1/3]`);

        let guildStats = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(message.guild.iconURL())
            .setTitle('Guild Information')
            .setDescription('Guild Statics')
            .addFields([
                { name: 'Members', value: message.guild.members.cache.size, inline: true },
                { name: 'Users', value: message.guild.members.cache.filter((member) => !member.user.bot).size, inline: true },
                { name: 'Bots', value: message.guild.members.cache.filter((member) => member.user.bot).size, inline: true },
                { name: 'Channels', value: message.guild.channels.cache.size, inline: true },
                { name: 'Text Channels', value: message.guild.channels.cache.filter((channel) => channel.type === 'text').size, inline: true },
                { name: 'Voice Channels', value: message.guild.channels.cache.filter((channel) => channel.type === 'voice').size, inline: true },
                { name: 'Roles', value: message.guild.roles.cache.size, inline: true }
            ])
            .setTimestamp()
            .setFooter(`${this.client.user.username} [2/3]`);

        let guildSecurity = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(message.guild.iconURL())
            .setTitle('Guild Information')
            .setDescription('Security')
            .addFields([
                { name: 'Verification Level', value: message.guild.verificationLevel, inline: true },
                { name: 'Content Filter', value: message.guild.explicitContentFilter, inline: true },
                { name: 'MFA Level', value: message.guild.mfaLevel, inline: true }
            ])
            .setTimestamp()
            .setFooter(`${this.client.user.username} [3/3]`);

        let pages = [guildGeneral, guildStats, guildSecurity];
        let page = 1;

        message.delete();
        message.channel.send(guildGeneral).then(async(m) => {

            await m.react('⬅');
            await m.react('➡');

            let leftFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
            let rightFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

            let leftCollector = m.createReactionCollector(leftFilter, { time: 60000 });
            let rightCollector = m.createReactionCollector(rightFilter, { time: 60000 });

            leftCollector.on('collect', (r) => {
                if (page === 1) {
                    if (!message.member.hasPermission('MANAGE_GUILD')) {
                        page = 2;
                        m.edit(pages[page - 1]);
                    } else {
                        page = 3;
                        m.edit(pages[page - 1]);
                    }
                } else {
                    page = page - 1;
                    m.edit(pages[page - 1]);
                }
                r.users.remove(message.author.id);
            });

            rightCollector.on('collect', (r) => {
                if (page === 3) {
                    page = 1;
                    m.edit(pages[page - 1]);
                } else if (page === 2) {
                    if (!message.member.hasPermission('MANAGE_GUILD')) {
                        page = 1;
                        m.edit(pages[page - 1]);
                    } else {
                        page = page + 1;
                        m.edit(pages[page - 1]);
                    }
                } else {
                    page = page + 1;
                    m.edit(pages[page - 1]);
                }
                r.users.remove(message.author.id);
            });

        });

    }

}

// Module Exports
module.exports = GuildInfo;