const config = require('../../config/config.json')
const {convertIDtoString} = require('../generalFunctions')
const {EmbedBuilder} = require("discord.js");
const path = './functions/match/matchTemplate.json';
const fs = require('fs')

function queueEmbed(message, queue)
{
    var file = fs.readFileSync(path);
    let matchJson = JSON.parse(file);

    var players = convertIDtoString(message, queue);

    const queueEmbed = new EmbedBuilder()
	.setColor('#0099ff')
	.setTitle(`Queue ${queue.length}/${config.matchsize}`)
    .setDescription(`Players: ${players}`)
    //.setFooter(`Match ID: ${matchJson.id}`)
    message.channel.send({embeds: [queueEmbed]});
}


module.exports = { queueEmbed }

