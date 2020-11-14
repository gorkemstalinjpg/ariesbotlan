const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['772806782585405441', '772783630078443550'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
let tag = "♰"
const kayıtlı = message.guild.roles.cache.find(r => r.id === '772797871900065793')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '772797426347540491')

if(!kayıtlı) return message.reply('**Kayıtlı Rolü Ayarlanmamış.**') 
if(!kayıtsız) return message.reply('**Kayıtsız Rolü Ayarlanmamış.**') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('**Kimi Kayıt Etmem Gerekiyor ?**')
let stg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('')
if(!yas) return message.reply('')

stg.setNickname(`${tag} ${isim} | ${yas}`)  
stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız)

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`erkekUye.${message.author.id}`, 1)
let erkek = db.get(`erkekUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
  
const embed = new Discord.MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı`)
    .addField(`<a:tac1:773146685740023820> Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`<a:space:772991575323967500> Kayıt Edilen:`, `<@${stg.user.id}> Kayıt Oldu`)
    .addField(`<a:purplediamond:772991493689704459>  Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
    .addField(`<a:alev:772991490816475146> Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`<a:dcworker:772991476283867186> Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`<a:registerbook:772991484081209345> Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
.setFooter(`Stalin X Aries`)
.setColor('GREEN')
client.channels.cache.get('772789215448137739').send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['erkek','e','man','boy'],
    permLevel: 0
};

exports.help = {
    name: 'erkek',
};