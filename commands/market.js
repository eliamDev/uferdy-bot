const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('market')
        .setDescription('Información del mercado de Albion Online')
        .addSubcommand(subcommand =>
            subcommand
                .setName('prices')
                .setDescription('Precios de items')
                .addStringOption(option =>
                    option.setName('item')
                        .setDescription('Nombre del item (ej: T4_BAG)')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('ciudad')
                        .setDescription('Ciudad específica')
                        .addChoices(
                            { name: 'Caerleon', value: 'Caerleon' },
                            { name: 'Bridgewatch', value: 'Bridgewatch' },
                            { name: 'Fort Sterling', value: 'Fort Sterling' },
                            { name: 'Lymhurst', value: 'Lymhurst' },
                            { name: 'Martlock', value: 'Martlock' },
                            { name: 'Thetford', value: 'Thetford' }
                        )))
        .addSubcommand(subcommand =>
            subcommand
                .setName('compare')
                .setDescription('Compara precios entre ciudades')
                .addStringOption(option =>
                    option.setName('item')
                        .setDescription('Nombre del item')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('trending')
                .setDescription('Items más comerciados')),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        try {
            switch (subcommand) {
                case 'prices':
                    await handlePrices(interaction);
                    break;
                case 'compare':
                    await handleCompare(interaction);
                    break;
                case 'trending':
                    await handleTrending(interaction);
                    break;
            }
        } catch (error) {
            console.error('Error en comando market:', error);
            await interaction.reply({ 
                content: 'Error al obtener información del mercado.', 
                ephemeral: true 
            });
        }
    },
};

async function handlePrices(interaction) {
    const itemName = interaction.options.getString('item');
    const city = interaction.options.getString('ciudad') || 'Caerleon';
    
    await interaction.deferReply();

    const embed = new EmbedBuilder()
        .setTitle(`💰 Precios - ${itemName}`)
        .setColor(0xFFD700)
        .addFields(
            { name: '🏪 Ciudad', value: city, inline: true },
            { name: '📦 Item', value: itemName, inline: true },
            { name: '💡 Estado', value: 'Función en desarrollo', inline: true }
        )
        .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
}

async function handleCompare(interaction) {
    const itemName = interaction.options.getString('item');
    await interaction.deferReply();

    const embed = new EmbedBuilder()
        .setTitle(`📊 Comparación - ${itemName}`)
        .setColor(0x32CD32)
        .addFields(
            { name: '📦 Item', value: itemName, inline: false },
            { name: '💡 Estado', value: 'Función en desarrollo - comparará precios entre todas las ciudades', inline: false }
        )
        .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
}

async function handleTrending(interaction) {
    await interaction.deferReply();

    const embed = new EmbedBuilder()
        .setTitle('📈 Items Trending')
        .setColor(0xFF6B35)
        .addFields(
            { name: '🔥 Popular', value: 'Función en desarrollo', inline: false },
            { name: '💡 Info', value: 'Mostrará los items más comerciados', inline: false }
        )
        .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
}