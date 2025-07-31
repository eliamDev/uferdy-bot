const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const BASE_URL = 'https://gameinfo.albiononline.com/api/gameinfo';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('albion')
        .setDescription('Comandos relacionados con Albion Online')
        .addSubcommand(subcommand =>
            subcommand
                .setName('player')
                .setDescription('Busca información de un jugador en el servidor America')
                .addStringOption(option =>
                    option.setName('nombre')
                        .setDescription('Nombre del jugador')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('guild')
                .setDescription('Busca información de una guild en el servidor America')
                .addStringOption(option =>
                    option.setName('nombre')
                        .setDescription('Nombre de la guild')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('kills')
                .setDescription('Últimas kills de un jugador en el servidor America')
                .addStringOption(option =>
                    option.setName('nombre')
                        .setDescription('Nombre del jugador')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('limite')
                        .setDescription('Número de kills a mostrar (máximo 10)')
                        .setMinValue(1)
                        .setMaxValue(10))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        try {
            switch (subcommand) {
                case 'player':
                    await handlePlayerInfo(interaction);
                    break;
                case 'guild':
                    await handleGuildInfo(interaction);
                    break;
                case 'kills':
                    await handlePlayerKills(interaction);
                    break;
            }
        } catch (error) {
            console.error('Error en comando albion:', error);
            await interaction.reply({ 
                content: 'Error al obtener información de Albion Online. Por favor intenta de nuevo más tarde.', 
                ephemeral: true 
            });
        }
    },
};

async function handlePlayerInfo(interaction) {
    const playerName = interaction.options.getString('nombre');
    await interaction.deferReply();

    try {
        const response = await axios.get(`${BASE_URL}/search?q=${encodeURIComponent(playerName)}`);
        const players = response.data.players;

        if (!players || players.length === 0) {
            await interaction.editReply(`No se encontró ningún jugador con el nombre "${playerName}" en el servidor America.`);
            return;
        }

        const player = players[0];
        const playerDetails = await axios.get(`${BASE_URL}/players/${player.Id}`);
        const playerData = playerDetails.data;
        

        // Calcular ratio kill/death fame
        const killFame = playerData.KillFame || 0;
        const deathFame = playerData.DeathFame || 0;
        const ratio = deathFame > 0 ? (killFame / deathFame).toFixed(2) : killFame > 0 ? '∞' : '0.00';
        
        const embed = new EmbedBuilder()
            .setTitle(`🛡️ ${playerData.Name}`)
            .setColor(0x0099FF)
            .addFields(
                { name: 'Guild', value: playerData.GuildName || 'Sin guild', inline: true },
                { name: 'Kill Fame', value: killFame.toLocaleString(), inline: true },
                { name: 'Death Fame', value: deathFame.toLocaleString(), inline: true },
                { name: 'K/D Ratio', value: ratio, inline: true },
                { name: 'Fame Total', value: (playerData.Fame || playerData.TotalKillFame || playerData.LifetimeStatistics?.PvE?.Total || 0).toLocaleString(), inline: true }
            )
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    } catch (error) {
        console.error('Error al buscar jugador:', error);
        await interaction.editReply(`Error al buscar información del jugador "${playerName}".`);
    }
}

async function handleGuildInfo(interaction) {
    const guildName = interaction.options.getString('nombre');
    await interaction.deferReply();

    try {
        const response = await axios.get(`${BASE_URL}/search?q=${encodeURIComponent(guildName)}`);
        const guilds = response.data.guilds;

        if (!guilds || guilds.length === 0) {
            await interaction.editReply(`No se encontró ninguna guild con el nombre "${guildName}" en el servidor America.`);
            return;
        }

        const guild = guilds[0];
        const guildDetails = await axios.get(`${BASE_URL}/guilds/${guild.Id}`);
        const guildData = guildDetails.data;
        
        const embed = new EmbedBuilder()
            .setTitle(`⚔️ ${guildData.Name}`)
            .setColor(0xFF6B35)
            .addFields(
                { name: 'Alliance', value: guildData.AllianceName || guildData.AllianceTag || 'Sin alliance', inline: true },
                { name: 'Miembros', value: guildData.MemberCount?.toString() || '0', inline: true },
                { name: 'Kills', value: guildData.killFame?.toString() || '0', inline: true },
                { name: 'Deaths', value: guildData.DeathFame?.toString() || '0', inline: true }
            )
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    } catch (error) {
        console.error('Error al buscar guild:', error);
        await interaction.editReply(`Error al buscar información de la guild "${guildName}".`);
    }
}

async function handlePlayerKills(interaction) {
    const playerName = interaction.options.getString('nombre');
    const limit = interaction.options.getInteger('limite') || 5;
    await interaction.deferReply();

    try {
        const searchResponse = await axios.get(`${BASE_URL}/search?q=${encodeURIComponent(playerName)}`);
        const players = searchResponse.data.players;

        if (!players || players.length === 0) {
            await interaction.editReply(`No se encontró ningún jugador con el nombre "${playerName}" en el servidor America.`);
            return;
        }

        const player = players[0];
        const killsResponse = await axios.get(`${BASE_URL}/players/${player.Id}/kills?range=week&limit=${limit}&offset=0`);
        const kills = killsResponse.data;

        if (!kills || kills.length === 0) {
            await interaction.editReply(`${playerName} no tiene kills recientes.`);
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`💀 Últimas kills de ${playerName}`)
            .setColor(0xFF0000)
            .setTimestamp();

        kills.forEach((kill, index) => {
            const victim = kill.Victim;
            const date = new Date(kill.TimeStamp).toLocaleDateString('es-ES');
            const fame = kill.TotalVictimKillFame || 0;
            
            embed.addFields({
                name: `Kill #${index + 1}`,
                value: `**Víctima:** ${victim.Name}\n**Guild:** ${victim.GuildName || 'Sin guild'}\n**Fame:** ${fame}\n**Fecha:** ${date}`,
                inline: false
            });
        });

        await interaction.editReply({ embeds: [embed] });
    } catch (error) {
        console.error('Error al buscar kills:', error);
        await interaction.editReply(`Error al buscar kills de "${playerName}".`);
    }
}