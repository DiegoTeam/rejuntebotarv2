const Rcon = require('rcon');
const fs = require('fs');
const { getMatchIncomplete } = require('../../match/matchHandler');
const pathCredentials = './functions/server/rcon/credentials/RconCredentials.json';

//Options beign used by goldsource engine shouldn't be changed
const options = {
    tcp: false, //udp
    challenge: true //hlds uses challenge

};

const conn = {
    brasil: {
        name: 'brasil',
        connection: undefined
    },
    useast: {
        name: 'useast',
        connection: undefined
    },
    uscentral: {
        name: 'uscentral',
        connection: undefined
    }
}

function turnOnRconConnection(message, _servername) {
    const serverCredentialsFile = fs.readFileSync(pathCredentials)
    const serverCredentials = JSON.parse(serverCredentialsFile);
    conn[_servername].connection = new Rcon(serverCredentials[_servername].ip, serverCredentials[_servername].port, serverCredentials[_servername].rconPassword, options);
    conn[_servername].connection.connect();
    console.log("Establishing connection with the server");
    console.log("servername", _servername);
    console.log("Ip: ", serverCredentials[_servername].ip);

    conn[_servername].connection.on('auth', function () {
        console.log("Authenticated with the hlds server ", _servername);

    }).on('response', function (str) {
        console.log("The server ", _servername, " answered : \n" + str);

    }).on('end', function () {
        console.log("The connection with server ", _servername, " has been closed");
    }).on('error', function () {
        console.log("Error while trying to connect to the hlds server ", _servername, " by rcon");
    });

    message.channel.send("Estableciendo conneccion rcon con el servidor");

    return conn;
}

function sendRconResponse(message, args) {

    let currentMatches = getMatchIncomplete();
    let currentMatch;
    currentMatches.forEach(m => {
        if (m.server === args[0]) {
            currentMatch = m;
        }
    })

    //if is asking for the teams, share the teams

    switch (args[1]) {
        case 'teams':
            console.log("Current match: ", currentMatch);



            var team1 = "";
            currentMatch.team1.forEach(async uid => {
                let user = await message.client.users.fetch(uid);
                team1 += user.username + " ";
            })
            var team2 = "";
            currentMatch.team2.forEach(async uid => {
                let user = await message.client.users.fetch(uid);
                team2 += user.username + " ";
            })
            setTimeout(() => {
                conn[currentMatch.server].connection.send("say Red Team");
                conn[currentMatch.server].connection.send("say " + team1);
                conn[currentMatch.server].connection.send("say Blue Team");
                conn[currentMatch.server].connection.send("say " + team2);
            }, 6000);

            break;
    }
    message.channel.send("Sending teams info to the server");


}

module.exports = { turnOnRconConnection, sendRconResponse };