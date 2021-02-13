const Discord = require('discord.js');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });

const prefix = "g!";
const vanish = true;
const channelAtEmote = "705536774759383171";
const idGraphArea = "705528569350062090";

const idEdifay = '321673326105985025';

const idEmojiYes = "775007441619910706";
const idEmojiNo = "775007467717132319";

let actualActivity = "";

const token = 'ODA2NjA0MTIyOTg3NDI5OTM5.YBr2oA.ZUAC5wrIZaF89I6XzpSh-n3kN6c';

client.on('ready', async () => {
    console.log('client connected !');
    const guild = await client.guilds.fetch(idGraphArea);
    const needed = guild.memberCount + " membres";
    if (actualActivity !== needed) {
        actualActivityl = needed;
        client.user.setActivity(needed, { type: 'PLAYING' });
    }
});

client.on('guildMemberAdd', async member => {
    try {
        await member.user.createDM();
        const embed = new Discord.MessageEmbed({
            "title": "Bienvenue sur Graph'Area !",
            "description": "Bienvenue sur notre serveur ! Sur ce message, vous trouverez un petit guide qui vous permettras de ne pas vous perdre sur le serveur x)\nBien, commençons :upside_down:\n\nPremièrement, vous devez suivre les instructions de la vérification pour avoir accès à l'intégralité du serveur ! Si cela est déjà fait alors vous pouvez poursuivre votre lecture et prendre connaissance des informations suivantes :\n\n:scroll: **1. Le Règlement**\n> Il se situe [ici](https://discord.com/channels/705528569350062090/705534710037872661/774631398525894666), merci de lire les règles qui sont comprises dans ce dernier, c'est très important.\n\n:wrench: **2. Rôles**\n> Vous souhaitez mettre en avant votre travail ? Vous pouvez vous rendre [ici](https://discord.com/channels/705528569350062090/705534905693634630/806559562458988594) et vous attribuer un grade qui vous permettras de vous mettre en avant sur le serveur.\n\n:mailbox_with_mail: **3. Projets Publicitaires**\n> Vous souhaitez promouvoir votre serveur ? Ça tombe bien, Graph'Area vous le permet ! Vous pouvez vous rendre [ici](https://discord.com/channels/705528569350062090/705535441113186364/708081012462190652)\n\n**📩 4. Support**\n> Vous avez une question ? Un signalement ? Une demande spécifique ? Vous pouvez directement nous contacter en créant un ticket dans <#749705112095555659>.",
            "color": 2588660,
            "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/734090060101714095/806578802955124756/20210130_215609.jpg"
            }
        });
        await member.user.dmChannel.send(embed);
    } catch {
        console.log("err")
    }
});

client.on('message', message => {
    if (message.author.bot) return;

    if (message.guild == null) {
        message.author.dmChannel.send("Les commandes sont désactivées dans les ``Messages privés``");
        return;
    }
    if (message.channel.id == channelAtEmote) {
        message.react(message.guild.emojis.cache.find(emoji => emoji.id === idEmojiYes));
        message.react(message.guild.emojis.cache.find(emoji => emoji.id === idEmojiNo));
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commands = args.shift().toLowerCase();

    if (commands.length == 0) {
        message.channel.send("Veuillez rentrer une commande !").then(m => {
            setTimeout(() => {
                m.delete();
            }, 30000);
        })
        message.delete();
        return;
    }
    switch (commands) {
        case "ping":
            if (message.member.permissions.has("ADMINISTRATOR") || message.member.user.id === idEdifay)
                message.channel.send("La latence avec le bot est de `" + (Date.now() - message.createdTimestamp) + "`ms. La latence de l'api est de `" + Math.round(client.ws.ping) + "`ms");
            break;
        case "stop":
            if (message.member.permissions.has('ADMINISTRATOR') || message.member.user.id === idEdifay)
                process.exit(0);
        case "send":
            if (message.member.permissions.has("ADMINISTRATOR") || message.member.user.id === idEdifay) {
                if (args.length != 0) {
                    if (message.content.split("|").length == 2 && message.content.split("|")[1] != undefined) {
                        let atSend = message.content.split("|")[1];
                        message.mentions.users.forEach((user) => {
                            user.createDM().then(channel => {
                                channel.send(atSend).catch(() => {
                                    message.channel.send("Le membre : <@" + user.id + "> n'accepte pas les messages privé !");
                                });
                            }).catch(() => {
                                message.channel.send("Le membre : <@" + user.id + "> n'accepte pas les messages privé !");
                            });
                        });
                    } else {
                        message.channel.send("Vous n'avez pas inséré de message ou vous n'avez pas séparé la commande | du message avec `|`. Attention vous ne pouvez l'utilisé le séparateur que une seule fois !");
                    }
                } else {
                    message.channel.send("Pour envoyé un message privé à des membres, vous devez utilisé la commande comme ceci :\n" +
                        "`" + prefix + "send @tag | Le message`\n" +
                        "Le | permet de séparer le message de la commande ! Pensez bien à le mettre.").then(msg => {
                            setTimeout(() => {
                                if (msg.deletable)
                                    msg.delete();
                            }, 30000);
                        });
                }
            }
            break;
        default:
            message.channel.send("Il n'y a pas de commande à ce nom !");
            break;
    }

    if (vanish)
        message.delete();


});



client.login(token).then(() => {
    setInterval(async () => {
        const guild = await client.guilds.fetch(idGraphArea);
        const needed = guild.memberCount + " membres";
        if (actualActivity !== needed) {
            actualActivityl = needed;
            client.user.setActivity(needed, { type: 'PLAYING' });
        }
    }, 600000)
});