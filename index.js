require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
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
    // Manejar botones
    if (interaction.isButton()) {
        if (interaction.customId === 'clear_alerts') {
            await handleClearAlerts(interaction);
        }
        return;
    }
    
    if (!interaction.isChatInputCommand()) return;

    const ALLOWED_CHANNELS = [
        '1391207584517722252', // Canal original #albion-bot
        '1402162897378873375'  // Canal #albion-bot del servidor de soporte
    ];
    
    if (!ALLOWED_CHANNELS.includes(interaction.channelId)) {
        await interaction.reply({ 
            content: 'Este bot solo funciona en canales autorizados', 
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

// Función para manejar limpieza de alertas
async function handleClearAlerts(interaction) {
    const fs = require('fs');
    const path = require('path');
    const { EmbedBuilder } = require('discord.js');
    
    const ALERTS_FILE = path.join(__dirname, 'price-alerts.json');
    const userId = interaction.user.id;
    
    try {
        let alerts = [];
        if (fs.existsSync(ALERTS_FILE)) {
            alerts = JSON.parse(fs.readFileSync(ALERTS_FILE, 'utf8'));
        }
        
        // Filtrar alertas del usuario actual
        const alertsToKeep = alerts.filter(alert => alert.userId !== userId);
        const deletedCount = alerts.length - alertsToKeep.length;
        
        // Guardar alertas actualizadas
        fs.writeFileSync(ALERTS_FILE, JSON.stringify(alertsToKeep, null, 2));
        
        const embed = new EmbedBuilder()
            .setTitle('🗑️ Alertas Eliminadas')
            .setColor(0xFF6B35)
            .setDescription(`Se eliminaron ${deletedCount} alerta(s) correctamente.`)
            .setTimestamp();
            
        await interaction.reply({ embeds: [embed], ephemeral: true });
        
    } catch (error) {
        console.error('Error limpiando alertas:', error);
        await interaction.reply({ 
            content: 'Error al eliminar las alertas.', 
            ephemeral: true 
        });
    }
}

client.login(process.env.DISCORD_TOKEN);