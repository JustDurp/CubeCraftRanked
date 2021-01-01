/* jshint -W083 */
/**
 * @file Handlers.js
 */

// Library
const { readdirSync } = require('fs');
const { resolve, sep } = require('path');
const { Collection } = require('discord.js');

// RegisterEvents
class RegisterEvents {

    constructor(client, dir) {
        this.client = client;
        this.dir = resolve(`./src/${dir}`);
    }

    load() {
        readdirSync(this.dir).forEach((file) => {
            if (!file.endsWith('.js')) return;
            let event = new(require(resolve(`${this.dir}`, file)))(this.client);
            let eventName = file.split('.')[0];
            try {
                this.client.on(eventName, (...args) => event.run(...args));
                console.log(`Client - ${eventName} event has been loaded`);
            } catch (e) {
                console.log(`Client Error - Error while loading ${eventName}: ${e}`);
            }
        });
    }

}

// RegisterCommands
class RegisterCommands {

    constructor(client, dir) {
        this.client = client;
        this.dir = resolve(`./src/${dir}`);
    }

    load() {
        ['commands', 'aliases'].forEach(a => this.client[a] = new Collection());
        readdirSync(this.dir).forEach((dirs) => {
            let commands = readdirSync(`${this.dir}${sep}${dirs}${sep}`).filter((files) => files.endsWith('.js'));
            for (let file of commands) {
                let command = new(require(resolve(this.dir, dirs, file)))(this);
                if (command.pull && typeof(command.pull.name) === 'string') {
                    if (this.client.commands.get(command.pull.name))
                        return console.log(`Client Error - Two or more commands have the same name!`);
                    try {
                        this.client.commands.set(command.pull.name, command);
                        console.log(`Client - ${command.pull.name} command has been loaded!`);
                    } catch (e) {
                        console.log(`Client Error - Error while loading ${command.pull.name}: ${e}`);
                    }
                } else {
                    console.log(`Client Error - Error while loading commands in ${this.dir}${dirs}!`);
                    continue;
                }
                if (command.pull.aliases && typeof(command.pull.aliases) === 'object') {
                    command.pull.aliases.forEach((alias) => {
                        if (this.client.aliases.get(alias)) return console.log(`Client Error - Two or more commands have the same aliases!`);
                        this.client.aliases.set(alias, command.pull.name);
                    });
                }
            }
        });
    }

}
module.exports = { RegisterCommands, RegisterEvents };