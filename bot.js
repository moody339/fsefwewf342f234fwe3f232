const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "1";
const coolDown = new Set();

client.on('ready', () => {
console.log("i'm ready.")
})
client.on("message", async message => {
if (message.content.indexOf(prefix) != 0) return;
const args = message.content.slice(prefix.length).trim().split(" ");
const command = args.shift().toLowerCase();
let x = ["344966841535561730"]
let num = 0;
if (command == 'Ticket' || command == 'ticket') {
if (!x.includes(message.author.id)) return;
let category = message.guild.channels.cache.find(c => c.name == "Ticket System" && c.type == "category");
if(!category) {
await message.guild.channels.create('Ticket System', { type: 'category' }) }
const logchannel = message.guild.channels.cache.find(
logchannele => logchannele.name.toLowerCase() === "ticket-log"
)
const ticketchannel = message.guild.channels.cache.find(
  logchannele => logchannele.name.toLowerCase() === "open-ticket"
  )

  if(!ticketchannel) {
    let category = message.guild.channels.cache.find(c => c.name == "Ticket System" && c.type == "category");
     let setcatopen = await message.guild.channels.create(`open-ticket`, { type: 'text' })  // شات التكت 
 setcatopen.setParent(category.id);
 await setcatopen.overwritePermissions([
  {
      id: message.guild.id,
      deny: ['SEND_MESSAGES'],
  },
  {
      id: client.user.id,
      allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
  }
  ])
}

let ticketchannelcheck = message.channel.guild.channels.cache.find((channel) => channel.name.toLowerCase() === `open-ticket`)
const kboosh = {
title: `${message.guild.name} Ticket System`,
description: `**اضغط على الريآكشن اذا اردت فتح تكت**`,
timestamp: new Date(),
}
let basic = await ticketchannelcheck.send({embed: kboosh});
basic.react('📧');

if(!logchannel) {
  let category = message.guild.channels.cache.find(c => c.name == "Ticket System" && c.type == "category");
  let setcatlog = await message.guild.channels.create(`ticket-log`, {type: 'text'}) // يسوي شات لوق التيكت اذا مو موجود
  setcatlog.setParent(category.id);
  await setcatlog.overwritePermissions([
    {
        id: message.guild.id,
        deny: ['VIEW_CHANNEL' ,'SEND_MESSAGES'],
    },
    {
        id: client.user.id,
        allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
    }
  ])
}
client.on('messageReactionAdd', async (reaction, user) => {
 if(reaction.emoji.name === "📧") {
  if (user.id === client.user.id || user.id === user.bot) return;
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**لا امتلك صلاحية \`Manage Messages\` لحذف الريآكشن**`); 
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**لا امتلك صلاحية \`Manage Channels\` لصنع شات**`);
  if(coolDown.has(user.id)) return reaction.users.remove(user.id); 
  reaction.users.remove(user.id);
  coolDown.add(user.id)
  setTimeout(() => {
  coolDown.delete(user.id)
  }, 300000)
   let ticketreq = await message.guild.channels.create(`Ticket-${num+=1}`, { type: 'text'})// رقم التكت يترستر كل مرة الا اذا ربطته بداتا بيس
      let category = message.guild.channels.cache.find(c => c.name == "Ticket System" && c.type == "category");
      ticketreq.setParent(category.id)
      await ticketreq.overwritePermissions([
        {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
        {
            id: user.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
        },
        {
            id: client.user.id,
            allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
        },
      /*  {  
          id: message.guild.roles.cache.find(r => r.id === "829415978932371526"),  // لاضافة رول معيّن للتكت
          allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
      } */
      ])
      .then(async kboo$ => {

    let logchannels = message.channel.guild.channels.cache.find((channel) => channel.name.toLowerCase() === `ticket-log`)
    const logembednew = {
      author: {
      name: `Ticket System`,
      icon_url: "https://blog.logomyway.com/wp-content/uploads/2020/12/discord-mascot.png",
      },
      description: `**قام <@${user.id}>\n بانشاء تكت : ( ${kboo$.name} )**`,
      timestamp: new Date(),
      }
    logchannels.send({ embed: logembednew });

  const lekboosh = {
    author: {
    name: `Ticket System`,
    icon_url: `https://blog.logomyway.com/wp-content/uploads/2020/12/discord-mascot.png`,
    },
    description: '**لإغلاق التكت اضغط على ريآكشن ❌**',
    timestamp: new Date(),
  }
  kboo$.send(`<@${user.id}>`,{embed: lekboosh})
  .then(async reactkboos => {
    reactkboos.react('❌')
    client.on('messageReactionAdd', async (reaction, user) => {
    if(reaction.emoji.name === '❌') {
      if (user.id === client.user.id || user.id === user.bot) return;
      if (coolDown.has(user.id)) return coolDown.delete(user.id)
      kboo$.overwritePermissions([
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
      },
      {
        id: user.id,
        deny: ['VIEW_CHANNEL'],
    },
      {
          id: client.user.id,
          allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
      }
      ]);
      reaction.users.remove(user.id);
      const logembedclose = {
        author: {
          name: `Ticket System`,
          icon_url: `https://blog.logomyway.com/wp-content/uploads/2020/12/discord-mascot.png`,
        },
        description: `**قام <@${user.id}>\n باغلاق تكت : ( ${kboo$.name} )**`,
        timestamp: new Date(),
        }
        logchannels.send({ embed: logembedclose });
       }; 
      })
     })
    })
   }
  })
 }
});

client.on("message", async message => {
  if (message.content.indexOf(prefix) != 0) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
if(command === 'حذف' || command === 'delete' || command === 'Delete') {
  let logchannels = message.channel.guild.channels.cache.find((channel) => channel.name.toLowerCase() === `ticket-log`)
  if (message.channel.name.toLowerCase().includes(`ticket-`)) {
  message.channel.delete(); // يحذف التكت
  const logembedclose = {
    author: {
      name: `Ticket System`,
      icon_url: `https://blog.logomyway.com/wp-content/uploads/2020/12/discord-mascot.png`,
    },
    description: `**قام <@${message.author.id}>\nبحذف تكت : ( ${message.channel.name} )**`,
    timestamp: new Date(),
    }
    logchannels.send({ embed: logembedclose }) // يرسل رسالة لـ اللوق اذا انحذف التكت
  }
 }
});

client.on("message", async message => {
  if (message.content.indexOf(prefix) != 0) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  if (command == 'rename' || command == 'Rename' || command == 'اسم' || command == 'الاسم') {
      if (message.channel.name.toLowerCase().includes(`ticket-`)) {
      let kbooshargs = message.content.split(" ").slice(1);
      if (kbooshargs == 0) return message.channel.send(`**ضع الاسم\n Example: \`${prefix}${command} closed\`**`);
      message.channel.setName(args.join(' '));
    message.channel.send(`**تم تغيير اسم الروم الى \`${kbooshargs.join(' ')}\`**`)
  }
 }
});

client.on("message", async message => {
  if (message.content.indexOf(prefix) != 0) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  if (command == 'add' || command == 'Add' || command == 'اضافة') {
      if (message.channel.name.toLowerCase().includes(`ticket-`)) {
      let mention = message.mentions.users.first();
      if (!mention) return message.channel.send('**منشن الشخص اولاً**');
      
      message.channel.overwritePermissions([
        {
        id: message.guild.id,
        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
       },
        {
            id: mention.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
        },
        {
          id: client.user.id,
          allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
      }
      ]);
    message.channel.send(`**قُمت باضافة ${mention} الى التكت**`)
  }
 } else {
  if (command == 'remove' || command == 'Remove' || command == 'ازالة') {
    if (message.channel.name.toLowerCase().includes(`ticket-`)) {
      let mention = message.mentions.users.first();
      if (!mention) return message.channel.send('**منشن الشخص اولاً**');
      
      message.channel.overwritePermissions([
        {
        id: message.guild.id,
        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
       },
        {
          id: client.user.id,
          allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'SEND_MESSAGES', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
      }
      ]);
    message.channel.send(`**قُمت بازالة ${mention} من التكت**`)
    }
  }
 } 
});

client.login(process.env.BOT_TOKEN);
