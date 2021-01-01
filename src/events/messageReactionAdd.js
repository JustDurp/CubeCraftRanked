/**
 * @file messageReactionAdd.js
 */
const { catID } = require('../api/Storage')
const { MessageEmbed } = require('discord.js')
// Module Exports
module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async run(reaction, user) {
        const { con } = require('../app')

        if (reaction.message.partial) await reaction.message.fetch()
        if (reaction.partial) await reaction.fetch()
        if (user.bot) return;

        if (reaction.message.channel.id == "747813980226977912") {
            if (reaction.emoji.name == "🎟️") {
                await reaction.users.remove(user);
                con.query(`SELECT * FROM tickets WHERE userid = '${user.id}'`, (err, row) => {
                    if (row.length >= 1) return;
                    var userName = user.username
                    const categoryID = process.env.catID
                    var member = reaction.message.guild.member(user)

                    reaction.message.guild.channels.create("🎫-" + userName.toLowerCase(), { type: 'text' }).then((createdchannel) => {
                        createdchannel.setParent(categoryID).then((chan) => {

                            chan.updateOverwrite(reaction.message.guild.roles.cache.find(x => x.name === '@everyone'), {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false
                            });
                            chan.updateOverwrite(reaction.message.guild.roles.cache.find(x => x.name === '⛔-Staff'), {
                                SEND_MESSAGES: true,
                                VIEW_CHANNEL: true,
                                CONNECT: true,
                                READ_MESSAGES_HISTORY: true,
                                READ_MESSAGES: true
                            });

                            chan.updateOverwrite(user.id, {
                                CREATE_INSTANT_INVITE: false,
                                VIEW_CHANNEL: true,
                                READ_MESSAGES: true,
                                SEND_MESSAGES: true,
                                ATTACH_FILES: true,
                                CONNECT: true,
                                ADD_REACTIONS: true,
                                READ_MESSAGES_HISTORY: true

                            });

                            con.query(`INSERT INTO tickets(userid, channelid) VALUES('${user.id}', '${chan.id}')`, (err, row) => {
                                if (err) return console.log(err);
                            });


                            chan.send(`<@&623177928011808779>, <@${user.id}>`)

                            if (member.roles.cache.find(r => r.name === "New")) {
                                chan.send(new MessageEmbed()
                                    .setTitle("Welcome to the CubeCraft Ranked Server, " + user.username)
                                    .setColor("BLUE")
                                    .setDescription("**Please answer these questions!**\nDo you play on CubeCraft? If yes:\nWhat is your Minecraft name?\nWhat is your level?\nWhich rank are you?\nAre you on any leaderboards?")
                                    .setTimestamp())

                            } else {

                                chan.send(new MessageEmbed()
                                    .setDescription(`**Hello ${user.username}**\nWhats is your question?`)
                                    .setTimestamp()
                                    .setColor("GREEN"))

                            }
                        })
                    })
                })
            }
        }
    }

};