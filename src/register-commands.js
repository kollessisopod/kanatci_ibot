require('dotenv').config();

const { REST , Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name : 'siparis',
        description : 'Abicim karar verdiniz mi',
        options : [
            {
                name : 'num1',
                description : 'First number',
                required : true,
                type: ApplicationCommandOptionType.String, // Changed to STRING type
                choices: [
                    {
                        name: 'Adana Kebap',
                        value: 'Adana Kebap'
                    },
                    {
                        name: 'Tavuk Şiş',
                        value: 'Tavuk Şiş'
                    },
                    {
                        name: 'Tavuk Pirzola',
                        value: 'Tavuk Pirzola'
                    },
                    {
                        name : 'Kuzu Şiş',
                        value : 'Kuzu Şiş'
                    },
                    {
                        name : 'Porsiyon',
                        value : 'Porsiyon'
                    },
                    {
                        name : 'Yarım Kilo',
                        value : 'Yarım Kilo'
                    },
                    {
                        name : 'Kilo',
                        value : 'Kilo'
                    },
                    
                ]
            }
        ]
    },
    {
        name : 'salute',
        description : 'Salute a user',
    },
    {
        name : 'embed',
        description : 'Send an embed',
    },
    {
        name : 'abi',
        description : 'Abi bakar mısın?',
    }
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);


(async () => {
    try {
        console.log('Started refreshing application (/) commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

(async () => {
    try {
        console.log('Started refreshing application (/) commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.GUNAYDIN_CID, process.env.GUNAYDIN_GID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();


