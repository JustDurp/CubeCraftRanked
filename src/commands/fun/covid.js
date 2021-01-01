/**
 * @file test.js
 */

// Library
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../api/Command');
const fetch = require("node-fetch");
const { SearchCountry } = require("../../api/api")

class Covid extends Command {

    constructor(client) {
        super(client, {
            name: 'covid',
            description: 'Get information about Covid-19 in a certain country!',
            category: 'other'
        });

    }

    async run(message, args) {


        if (!args[0]) return message.channel.send(new MessageEmbed().setTitle("Please give up a country name!").setColor("RED"));
        const join = args.join("-")

        SearchCountry(join).then(async (info) => {
            if (info == null) return message.channel.send(new MessageEmbed().setTitle("Please give up a valid country name!").setColor("RED"));

            var confirmed = info.NewRecovered;
            var confirmed1 = info.TotalRecovered;
            if (confirmed1 == "0") confirmed1 = "I've got no access to see this!"
            if (confirmed == "0") confirmed = "I've got no access to see this!"

            message.channel.send(new MessageEmbed()
                .setTitle(`Covid Information | ${info.Country}`).addFields({ name: `Today's infections:`, value: info.NewConfirmed, inline: true }, { name: `Total Infections:`, value: info.TotalConfirmed, inline: true }, { name: `Today's deaths`, value: info.NewDeaths, inline: true }, { name: `Total deaths`, value: info.TotalDeaths, inline: true }, { name: `New recovered`, value: confirmed, inline: true }, { name: `Total recovered`, value: confirmed1, inline: true }).setColor(message.member.displayHexColor).setFooter(`Covid 19 - ${info.Country}`).setTimestamp())
        }).catch((err) => console.log(err));

    }

}

// Module Exports
module.exports = Covid