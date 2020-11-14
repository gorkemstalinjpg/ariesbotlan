const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('772797426347540491'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG


//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

client.on("guildMemberAdd", member => {  
    const kanal = member.guild.channels.cache.find(r => r.id === "772789215448137739");
    const register = "<@&772806782585405441>"
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor'
    moment.locale("tr");
      const strigalog = new Discord.MessageEmbed()
      .setAuthor(member.guild.name)
  .setDescription("<a:brave:772991475863912519> **Hoşgeldin! <@" + member + "> Seninle \`" + member.guild.memberCount + "\` Kişiyiz.\n\n<a:brave:772991475863912519> Müsait olduğunda V.Confirmation Odalarından Birine Geçip Kaydını Yaptırabilirsin. \n\n<a:brave:772991475863912519> <@&772806782585405441> seninle ilgilenicektir. \n\n<a:brave:772991475863912519> Hesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n<a:brave:772991475863912519> "  + kontrol + "\n\n<a:brave:772991475863912519> Tagımızı alarak ` ♰ ` bize destek olabilirsin.**\n")
   .setImage("https://i.pinimg.com/originals/2c/43/ac/2c43acd8c41ee853cf9fbb04960e4fa6.gif")
   kanal.send(strigalog)   
   kanal.send(register) 
  });
  
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG


//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '♰'
  const sunucu = '772781464265818133'
  const kanal = '773138450035376129'
  const rol = '772840979975241758'
  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`**${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim**`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!**`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`**${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım**`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam **${newUser.username}**, **Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!**`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});



//Serendia'dan alınıp V12 Çevirilmiştir!



client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === 'tag') {//TAG
    lrowstagmesaj.channel.send('`♰`');
  }
});

client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === 'sa') {//TAG
    lrowstagmesaj.channel.send('**Aleyküm Selam Canım, Hoşgeldin ^^**');
  }
});

client.on('message', lrowstagmesaj => {
  if (lrowstagmesaj.content.toLowerCase() === 'iyi geceler') {//TAG
    lrowstagmesaj.channel.send('**İyi Geceler, Aşkım Sütünü İçmeyi Unutma <3**');
  }
});

//BOTU SESE SOKMA//
client.on('ready', () => {
client.channels.cache.get('773227828963180548').join()
})

//OTO İSİM//
client.on("guildMemberAdd", async member => {

member.setNickname('♰ İsim | Yaş')
});

client.on("guildMemberAdd", async member => {

member.setNickname('♰ İsim | Yaş')
});