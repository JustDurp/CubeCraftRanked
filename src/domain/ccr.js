/**
 * @file ccr.js
 */

// Library
const { Client } = require('discord.js');
const { RegisterEvents, RegisterCommands } = require('../api/Handlers');
const { Functions } = require('../api/Functions');

// CubecraftClient
class CubecraftClient {

    constructor(token) {
        this.token = token;
        this.client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
    }

    start() {

        new RegisterEvents(this.client, './events/').load();
        new RegisterCommands(this.client, './commands').load();

        this.client.functions = new Functions();
        this.client.login(this.token);

    }

}

// Module Exports
module.exports = { CubecraftClient };