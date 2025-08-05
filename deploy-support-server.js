require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// ID del servidor de soporte
const SUPPORT_SERVER_ID = '1402151147401253026';

(async () => {
    try {
        console.log(`Desplegando ${commands.length} comandos en servidor de soporte.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, SUPPORT_SERVER_ID),
            { body: commands },
        );

        console.log(`Comandos desplegados en servidor de soporte: ${data.length} comandos.`);
    } catch (error) {
        console.error(error);
    }
})();