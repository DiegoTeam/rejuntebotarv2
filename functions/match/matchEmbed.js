const {convertIDtoString} = require("../generalFunctions")
const {queueEmbed} = require("../queue/queueEmbeds")
const footer = "45s to vote";
const {EmbedBuilder} = require("discord.js");


function mapEmbed(message, emojis, maps) {
	var maplist = "";
	for (let index = 0; index < maps.length; index++) {
		maplist += `${emojis[index]} ${maps[index]}\n`
	}
	maplist += `${emojis[4]} Re roll maps`;
	
	const mapEmbed = new EmbedBuilder()
	.setColor('#04c779')
	.setTitle('Vote Map')
	.setDescription(`Maps:\n${maplist}`)
	.setFooter({ text: '45s to vote'})
	return mapEmbed;
}

function serverEmbed(message, emojis, servers) {
	var serverlist = "";
	for (let index = 0; index < servers.length; index++) {
		serverlist +=`${emojis[index]} ${servers[index]}\n`
	}
	const serverEmbed = new EmbedBuilder()
	.setColor('#04c779')
	.setTitle('Vote Server')
	.setDescription(`Server:\n${serverlist}`)
	.setFooter({ text: '45s to vote'})
	
	return serverEmbed;
}

function matchEmbedIncomplete(message, team1, team2, server, map, id, date){
    var cTeam1 = convertIDtoString(message, team1);
    var cTeam2 = convertIDtoString(message, team2);
    
	const fields = [
		{ name: '**Server**', value: server || 'Unknown Server' },
		{ name: '**Map**', value: map || 'Unknown Map' },
		{ name: '**🔴 Red Team**', value: cTeam1 || 'Unknown Red Team', inline: true },
		{ name: '**🔵 Blue Team**', value: cTeam2 || 'Unknown Blue Team', inline: true }
	  ];


    const matchEmbed = new EmbedBuilder()
	.setColor('#fca903')
	.setTitle('Pickup ready!')
	.addFields(fields)
    message.channel.send({embed: matchEmbed})

}

function matchEmbed(message, team1, team2, server, map) {
	var cTeam1 = convertIDtoString(message, team1);
	var cTeam2 = convertIDtoString(message, team2);
  
	const currentServer = {
	  brasil: {
		name: 'Brasil',
		ip: '34.95.232.99:27015'
	  },
	  uscentral: {
		name: 'US Central',
		ip: '34.136.53.33:27015'
	  },
	  useast: {
		name: 'US East',
		ip: '34.86.237.46:27015'
	  }
	};
  
	// Verifica los valores de los campos
	console.log('team1:', team1);
	console.log('team2:', team2);
	console.log('server:', server);
	console.log('map:', map);
  
	const fields = [
	  { name: '**Server**', value: server || 'Unknown Server' },
	  { name: '**Map**', value: map || 'Unknown Map' },
	  { name: '**🔴 Red Team**', value: cTeam1 || 'Unknown Red Team', inline: true },
	  { name: '**🔵 Blue Team**', value: cTeam2 || 'Unknown Blue Team', inline: true }
	];
  
	const matchEmbed = new EmbedBuilder()
	  .setColor('#fca903')
	  .setTitle('Pickup ready!')
	  .addFields(fields)
	  .setDescription(`${currentServer[server]['name']} Server Connect Here -> steam://connect/${currentServer[server]['ip']}/rjt`);
  
	message.channel.send({ embeds: [matchEmbed] });
  }
  
  
  module.exports = { matchEmbed, serverEmbed, mapEmbed, matchEmbedIncomplete };
  