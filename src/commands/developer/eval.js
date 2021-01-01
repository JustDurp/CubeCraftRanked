/**
 * @file test.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');

// Test
class Eval extends Command {

    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Test command',
            category: 'developer'
        });


    }

    async run(message, args) {

        if (message.author.id === '281348487340359681') {

            function CleanText(text) {
                if (typeof (text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else return text;
            }

            let code = args.join(' ');
            if (!code) {
                let noCode = new MessageEmbed()
                    .setColor(process.env.c2)
                    .setDescription(`Je hebt geen code meegegeven!`)
                return message.channel.send(noCode);
            }

            try {

                let evaluated = eval(code);

                if (code.includes('process.env')) evaluated = 'Denk je dat ik echt zo dom ben?'
                if (evaluated.length >= 1020) evaluated = evaluated.substr(evaluated.length - 1019, evaluated.length);

                let evalEmbed = new MessageEmbed()
                    .setColor(process.env.c1)
                    .addField(`Geëvalueerd Van:`, `\`\`\`${code}\`\`\``)
                    .addField(`Geëvalueerd:`, `\`\`\`${CleanText(evaluated)}\`\`\``)
                    .setTimestamp()
                    .setFooter(process.env.footer)

                return message.channel.send(evalEmbed);

            } catch (e) {

                let failedEval = new MessageEmbed()
                    .setColor(process.env.c2)
                    .addField(`Geëvalueerd Van:`, `\`\`\`${code}\`\`\``)
                    .addField(`Error:`, `\`\`\`${CleanText(e)}\`\`\``)
                    .setTimestamp()
                    .setFooter(process.env.footer)
                return message.channel.send(failedEval);

            }

        } else {
            let embed = new MessageEmbed()
                .setDescription(`Je hebt hier geen permissies voor!`)
                .setColor(process.env.c2)
            return message.channel.send(embed);
        }

    }

}

// Module Exports
module.exports = Eval;