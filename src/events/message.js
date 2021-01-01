/**
 * @file message.js
 */
const { prefix } = require('../api/Storage');
const { MessageEmbed } = require('discord.js')

module.exports = class {

    constructor(client) {
        this.client = client;
    }
    async run(message) {

        if (message.content == `<@!${this.client.user.id}>`) return message.channel.send(new MessageEmbed().setDescription(`Yo ${message.author.username}, my current prefix is ${prefix}`).setColor('PURPLE')).catch(() => {
            return;
        });

        if (message.channel.id == '659823869720264714') {
            message.react('722817478119653458')
            message.react('722817545362735145')
        }
        const { con } = require('../app')
        con.query(`SELECT * FROM marry WHERE userid = '${message.author.id}'`, (err, row) => {
            if (!row) {
                con.query(`INSERT INTO marry(userid, marriedWith, married, marriedAt) VALUES('${message.author.id}', 'null', 'no', 'never')`, (err, row) => {
                    if (err) return console.log(err);
                });
            }
        });

        if (message.author.bot || !message.guild) return;

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toString();
        let command;

        if (!message.content.startsWith(prefix)) return;
        if (cmd.length === 0) return;

        if (this.client.commands.has(cmd)) command = this.client.commands.get(cmd);
        else if (this.client.aliases.has(cmd)) command = this.client.commands.get(this.client.aliases.get(cmd));

        if (command) {

            if (!message.member.hasPermission(command.pull.permission)) return message.channel.send(new MessageEmbed().setDescription(`**You haven't got permissions to use this command!**`).setColor('#ed4a21'));


            command.run(message, args);

        }

    }
}