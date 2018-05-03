const Discord = require('discord.js');
const Settings = require("./BotConfig.json");
const prefix = Settings.prefix;
const tDolls = require("./tDollList.json");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} online `);

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
});

bot.on("message", async message => {
    if(message.author.bot) return; //ignores messages from bots
    if(message.channel.type === "dm") return; //ignores commands in DMs

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    if(command === `${prefix}uinfo`) {  //get user info
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setThumbnail(message.author.avatarURL)
            .setDescription("Info: ")
            .setColor("#2531D6") //blue~
            .addField("Full Username ", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID ", message.author.id)
            .addField("Created At ", message.author.createdAt);


            message.channel.send(embed);
    }
    if(command === `${prefix}sinfo`) {  //get server info
        let embed = new Discord.RichEmbed()
            .setAuthor("Server Info: ")
            .setDescription(message.guild.name)
            .setThumbnail(message.guild.iconURL)
            .setColor("#2531D6") //command user's role's color
            .addField("Guild ID", message.guild.id)
            .addField("Created At", message.guild.createdAt)
            .addField("Members", message.guild.memberCount, true)
            .addField("Channels", message.guild.roles.array().length, true)
            .addField("Roles", message.guild.roles.array().length,true);

            message.channel.send(embed);
    }
    if(command === `${prefix}H`) { //command list and info
        if(messageArray.length == 1){
            let commandList = new Discord.RichEmbed()
                .setTitle("Bot Commands")
                .setFooter("Type !h command for more details on that command")
                .setThumbnail(bot.user.avatarURL)
                .addField("!sinfo",)
                .addField("!uinfo",)
                .addField("!h");
                //add more commands here
            message.channel.send(commandList);
        }else if(messageArray.length == 2){
            let commandDetails = new Discord.RichEmbed();
            if(messageArray[1] === "sinfo"){
                commandDetails.setAuthor("Command !sinfo", )
                    .addField("Displays info about the current server.");
                message.channel.send(commandDetails);
            }
            else if(messageArray[1] === "uinfo"){
                commandDetails.setAuthor("Command !uinfo", )
                    .addField("Displays info about the user");
                message.channel.send(commandDetails);
            }
        }//end if else if
    }
    if(command === `${prefix}test`){
        if(message.member.permissions.has("ADMINISTRATOR")){
            message.channel.send("You are an admin");
        }else{
            message.channel.send("You are not an admin");
        }
    }
    if(command === `${prefix}search`){
        let role = message.guild.roles.find(r => r.name ==="Commanders");
        if(role){
            message.channel.send("I found the Commanders role");
        }else{
            message.channel.send("I did not find the Commanders role");
        }
    }
    if(command === `${prefix}cRole`){
        let roleName = args[0];
        let role = message.guild.roles.find(r => r.name === roleName);
        if(role){
            message.channel.send("This role already exists.");
        }else if(!role){
            role = await message.guild.createRole({
                name: roleName,
                color: "#000000",
                mentionable: true,
                permissions: []
            });
            message.channel.send("Role "+roleName+" was created.");
        }
    }
    if(command === `${prefix}alert`){
        let role = message.guild.roles.find(r => r.name === "Commanders");
        if(role) {message.channel.send(`${role}`);}
        else if(!role) {message.channel.send("This role does not exist");}
    }
});

bot.login(Settings.token);