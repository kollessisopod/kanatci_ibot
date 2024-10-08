require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const { OpenAI, OpenAIApi } = require('openai');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ],
});


const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });



const imageMap = {
   
    'Adana Kebap' : 'https://cdn.getiryemek.com/products/1645293845032_500x375.jpeg', // Adana Kebap
    'Tavuk Şiş' : 'https://cdn.getiryemek.com/products/1645293851092_500x375.jpeg', // Tavuk Şiş
    'Tavuk Pirzola' : 'https://cdn.getiryemek.com/products/1645293848532_500x375.jpeg', // Tavuk Pirzola
    'Kuzu Şiş ': null, // Kuzu Şiş image missing
    'Porsiyon': null, // Porsiyon image missing
    'Yarım Kilo': 'https://cdn.getiryemek.com/products/1645293852082_500x375.jpeg', // Yarım Kilo
    'Kilo': 'https://cdn.getiryemek.com/products/1645293846588_500x375.jpeg'  // Kilo
};


client.on('ready', (c) => {
    console.log('Bot is ready: ', c.user.tag);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'siparis') {
        const foodstring = interaction.options.getString('num1');
        const image = imageMap[foodstring];
        
        if (image) {
            // If the image exists, reply with it
            await interaction.reply({
                content: `Here is your dish:`,
                files: [{ attachment: image, name: 'dish.jpg' }]
            });
        } else {
            // If the image doesn't exist, reply with a message
            await interaction.reply(`Sorry, we don't have an image for ${selectedValue}.`);
        }

        const embed = new EmbedBuilder()
            .setTitle(interaction.options.getString('num1'))
            .setDescription('afiyet olsun ${interaction.user.username} hocam')
            .setColor(0xff0000)
            .setImage(image);
        await interaction.reply({ embeds: [embed] });
    }

    if (commandName === 'salute') {
        const user = interaction.options.getUser('user');
        await interaction.reply(`Hello there, ${user}`);
    }

    if (commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('This is an embed')
            .setDescription('This is a description')
            .addFields(
                { name: 'Field 1', value: 'Value 1' , inline: true},
                { name: 'Field 2', value: 'Value 2' , inline: true},
            )
            .setColor(0xff0000);
        await interaction.reply({ embeds: [embed] });
    }


});

client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    if (/\b(abi|abim)\b/.test(message.content)) {
        message.reply('he abim');
    }

    if (/\b(sa)\b/.test(message.content)) {
        message.reply('as');
    }

    if (message.content.includes('alren')) {
        message.reply('sol badguy enjoyer');
    }
    
    if (message.content.includes('ibo')) {
        message.reply('buyur abim');
    }

    


});

function embedMaker(title, description, fields, color) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);
    fields.forEach((field) => {
        embed.addField(field.name, field.value, field.inline);
    });
    return embed;
}


client.login(process.env.DISCORD_TOKEN);

