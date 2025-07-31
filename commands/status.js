const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Estado del bot y estadísticas'),

    async execute(interaction) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const embed = new EmbedBuilder()
            .setTitle('🤖 Estado del Bot')
            .setColor(0x32CD32)
            .addFields(
                { name: '🟢 Estado', value: 'Online', inline: true },
                { name: '⏱️ Uptime', value: `${hours}h ${minutes}m ${seconds}s`, inline: true },
                { name: '🌍 Servidor', value: 'Albion America', inline: true },
                { name: '📊 Memoria', value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, inline: true },
                { name: '🏓 Ping', value: `${interaction.client.ws.ping}ms`, inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};