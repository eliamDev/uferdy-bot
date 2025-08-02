const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('utc')
        .setDescription('Muestra la hora actual en UTC'),

    async execute(interaction) {
        const now = new Date();
        const utcTime = now.toUTCString();
        const utcHour = now.getUTCHours().toString().padStart(2, '0');
        const utcMinute = now.getUTCMinutes().toString().padStart(2, '0');
        const utcSecond = now.getUTCSeconds().toString().padStart(2, '0');

        const embed = new EmbedBuilder()
            .setTitle('🕐 Hora UTC Actual')
            .setColor(0x0099FF)
            .addFields(
                { 
                    name: '⏰ Hora Completa', 
                    value: `${utcTime}`, 
                    inline: false 
                },
                { 
                    name: '🔢 Formato 24h', 
                    value: `${utcHour}:${utcMinute}:${utcSecond} UTC`, 
                    inline: true 
                },
                { 
                    name: '📅 Zona Horaria', 
                    value: 'UTC +0', 
                    inline: true 
                }
            )
            .setFooter({ text: 'Hora Universal Coordinada' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};