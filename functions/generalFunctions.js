const fetch = require('node-fetch')

function convertIDtoString(message,ids)
{
    var users = [];
    for (let index = 0; index < ids.length; index++) {
        var user = `<@!${ids[index]}>`
        users.push(user)
    }
    return users.join(', ');
}

function getUserFromMention(mention) {
	if (!mention) return;
	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return mention;
	}
}

function voteFor(message,args)
{
	argsSplited = args.join(' ')
	message.channel.send(`${argsSplited}`)
	.then(m => {
		m.react("👍")
		m.react("👎")
	})
}

module.exports = {convertIDtoString, getUserFromMention, voteFor}