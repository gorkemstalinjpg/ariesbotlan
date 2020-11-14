const Discord = require("discord.js");

exports.run = async (client, message, args) => {
//------------------------------------STRIGA--CODE-----------------------------------\\
  
let tag = "♰";
const aktif = message.guild.members.cache.filter(aktif => aktif.presence.status != "offline").size
const toplam = message.guild.memberCount
const ses = message.guild.channels.cache.filter(channel => channel.type === "voice").map(channel => channel.members.size).reduce((a, b) => a + b)
const tagli = message.guild.members.cache.filter(t => t.user.username.includes(tag)).size
const booster = message.guild.roles.cache.get('772783638785294336').members.size

//------------------------------------STRIGA--CODE-----------------------------------\\

const embed = new Discord.MessageEmbed()
.setColor('PURPLE')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`<a:alkis:773141934008827904> **Aries Toplam Üye ・ \`${toplam}\`
<a:sonsuz2:773471654835650571> Aktif Üye ・ \`${aktif}\`
<a:space:772991575323967500> Sesteki Üye ・ \`${ses}\`
<a:butterfly3:773848955325906956> Taglı Üye・ \`${tagli}\`
<a:purplediamond:772991493689704459> Booster Üye ・ \`${booster}\`**`)
message.channel.send(embed)
}

//------------------------------------STRIGA--CODE-----------------------------------\\

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say"
};