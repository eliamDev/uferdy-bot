require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] El comando en ${filePath} no tiene las propiedades "data" o "execute" requeridas.`);
        }
    }
}

client.once('ready', () => {
    console.log(`¡Bot conectado como ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const ALLOWED_CHANNELS = ['1391207584517722252']; // Canal original
    const SUPPORT_SERVER_ID = '1402151147401253026'; // Servidor de soporte
    
    // Permitir cualquier canal en el servidor de soporte o canal específico en otros servidores
    if (interaction.guildId !== SUPPORT_SERVER_ID && !ALLOWED_CHANNELS.includes(interaction.channelId)) {
        await interaction.reply({ 
            content: 'Este bot solo funciona en el canal #albion-bot', 
            ephemeral: true 
        });
        return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No se encontró el comando ${interaction.commandName}.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Hubo un error al ejecutar este comando!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Hubo un error al ejecutar este comando!', ephemeral: true });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);