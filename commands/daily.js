const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Información sobre las bonificaciones diarias de Albion Online'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('📅 Bonificaciones Diarias - Albion Online')
            .setColor(0xFFD700)
            .setDescription('Las bonificaciones diarias cambian cada día con el mantenimiento del servidor.')
            .addFields(
                { 
                    name: '🔍 Cómo verificar', 
                    value: 'En el juego: **Actividades > Bonificaciones de Producción**\nO presiona **Alt+Y**', 
                    inline: false 
                },
                { 
                    name: '⚒️ Tipos de Bonificación', 
                    value: '• **10%** o **20%** de bonificación en producción\n• **2 categorías** diferentes cada día\n• Incluye crafteo y refinado', 
                    inline: false 
                },
                {
                    name: '🛡️ Categorías de Armadura',
                    value: '• Cloth Armor (Tela)\n• Leather Armor (Cuero)\n• Plate Armor (Placas)',
                    inline: true
                },
                {
                    name: '⚔️ Categorías de Armas',
                    value: '• Axes, Bows, Crossbows\n• Cursed, Daggers, Fire\n• Frost, Holy, Maces\n• Nature, Quarterstaffs\n• Spears, Swords, War Gloves',
                    inline: true
                },
                {
                    name: '🔧 Otras Categorías',
                    value: '• Bags (Bolsas)\n• Capes (Capas)\n• Tools (Herramientas)\n• Off-hands\n• Cooking (Cocina)\n• Potions (Pociones)',
                    inline: true
                },
                {
                    name: '📊 Refinado',
                    value: '• Stone (Piedra)\n• Wood (Madera)\n• Fiber (Fibra)\n• Hide (Cuero)\n• Ore (Mineral)',
                    inline: false
                }
            )
            .setFooter({ text: 'Las bonificaciones cambian automáticamente cada día con el mantenimiento del servidor' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};