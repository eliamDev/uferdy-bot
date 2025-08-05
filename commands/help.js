const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra todos los comandos disponibles'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('📋 Comandos Disponibles')
            .setColor(0x00FF00)
            .addFields(
                { 
                    name: '⚔️ Comandos de Albion', 
                    value: '`/albion player <nombre>` - Info de jugador\n`/albion guild <nombre>` - Info de guild\n`/albion kills <nombre>` - Últimas kills', 
                    inline: false 
                },
                { 
                    name: '💰 Comandos de Mercado', 
                    value: '`/market prices <item> [ciudad]` - Precios de items\n`/market compare <item>` - Compara precios\n`/market trending` - Items populares\n`/market alert <item> <precio> [ciudad]` - 🔔 Alerta de precio\n`/market alerts` - Ver tus alertas activas', 
                    inline: false 
                },
                { 
                    name: '❓ Otros Comandos', 
                    value: '`/help` - Muestra este mensaje\n`/status` - Estado del bot\n`/utc` - Hora actual en UTC', 
                    inline: false 
                }
            )
            .setFooter({ text: 'uferdyBot - Servidor America' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};