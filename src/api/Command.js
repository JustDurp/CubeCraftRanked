/**
 * @file Command.js
 */

// Command
class Command {

    constructor(client, pull = {
        name: null,
        aliases: [],
        category: 'general',
        usage: '',
        description: 'No description provided',
        permissions: 'SEND_MESSAGES',
        userid: []
    }) {
        this.client = client.client;
        this.pull = pull;
    }
}

module.exports = { Command };