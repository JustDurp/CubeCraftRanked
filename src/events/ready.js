/**
 * @file ready.js
 */

// Module Exports
module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run() {

        console.log(`Client - ${this.client.user.tag} is online`);
        this.client.user.setPresence({ status: "DND", activity: { name: 'slushies', type: 'WATCHING' } });

        setInterval(() => {
            const channel = this.client.channels.cache.get('700899688978710619')
            channel.setName('Members: ' + channel.guild.memberCount)
        }, 600000);

    }

};