/**
 * @file guildmemberremove.js
 */
const { MessageEmbed } = require('discord.js');
// Module Exports
module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(member) {
        const channel = this.client.channels.cache.get('747819614636867695')
        this.client.channels.cache.get('747819614636867695').send(new MessageEmbed().setDescription(`**Bye ${member.user.username}**\n\nHopefully you'll ever return and participate in a tournament!`).setFooter(`Membercount: ${channel.guild.memberCount}`).setColor('#ff7c30').setThumbnail(member.user.displayAvatarURL()))

    }

};