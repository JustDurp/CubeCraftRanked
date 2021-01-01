/**
 * @file guildmemberadd.js
 */
const { MessageEmbed } = require('discord.js');
// Module Exports
module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(member) {
        const channel = this.client.channels.cache.get('747819614636867695')

        this.client.channels.cache.get('747819614636867695').send(new MessageEmbed().setDescription(`**Welcome to CubeCraft Ranked server, ${member.user.username}!**\n\nWe hope that you'll have an amazing time with chatting, playing minigames or competing in our tournaments!`).setFooter(`Membercount: ${channel.guild.memberCount}`).setColor('#48d2db').setThumbnail(member.user.displayAvatarURL()))

    }

};