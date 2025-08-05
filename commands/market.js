const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { translateItemName, translateItemNameDynamic, getItemDisplayName } = require('../utils/itemUtils');

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
                        .setDescription('Ciudad específica (opcional - sin ciudad muestra todas)')
                        .setRequired(false)
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
                .setDescription('Items más comerciados'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('alert')
                .setDescription('Configura alertas de precio')
                .addStringOption(option =>
                    option.setName('item')
                        .setDescription('Nombre del item (ej: T4_BAG)')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('precio')
                        .setDescription('Precio objetivo (te notificaré cuando baje de este precio)')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('ciudad')
                        .setDescription('Ciudad a monitorear')
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
                .setName('alerts')
                .setDescription('Ver y gestionar tus alertas activas')),

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
                case 'alert':
                    await handleAlert(interaction);
                    break;
                case 'alerts':
                    await handleAlerts(interaction);
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
    const specificCity = interaction.options.getString('ciudad');
    
    await interaction.deferReply();

    try {
        // Traducir nombre del item a código usando la API dinámica
        const itemCode = await translateItemNameDynamic(itemName);
        
        // Si se especifica una ciudad, mostrar solo esa ciudad con formato simple
        if (specificCity) {
            const url = `https://west.albion-online-data.com/api/v2/stats/prices/${itemCode}.json?locations=${specificCity}`;
            const response = await axios.get(url);
            const priceData = response.data;

            // Buscar datos para la ciudad especificada
            const resultado = priceData.find(d => d.city.toLowerCase() === specificCity.toLowerCase());
            
            if (!resultado) {
                return await interaction.editReply({ 
                    content: `❌ No se encontró el ítem **${getItemDisplayName(itemCode)}** en **${specificCity}**`,
                    ephemeral: true 
                });
            }

            const embed = new EmbedBuilder()
                .setTitle(`💰 Precio de ${getItemDisplayName(itemCode)} en ${specificCity}`)
                .setColor(0x00FF00)
                .addFields(
                    { name: '🔻 Precio de compra (Buy)', value: resultado.buy_price_max ? `${resultado.buy_price_max.toLocaleString()} silver` : 'No disponible', inline: true },
                    { name: '🔺 Precio de venta (Sell)', value: resultado.sell_price_min ? `${resultado.sell_price_min.toLocaleString()} silver` : 'No disponible', inline: true }
                )
                .setFooter({ text: 'Datos de west.albion-online-data.com' })
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        // Si no se especifica ciudad, mostrar TODAS las ciudades con formato detallado
        const cities = ['Caerleon', 'Bridgewatch', 'Fort Sterling', 'Lymhurst', 'Martlock', 'Thetford', 'BlackMarket'];
        const url = `https://west.albion-online-data.com/api/v2/stats/prices/${itemCode}.json?locations=${cities.join(',')}`;
        const response = await axios.get(url);
        const priceData = response.data;

        if (!priceData || priceData.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle(`💰 ${getItemDisplayName(itemCode)}`)
                .setColor(0xFF6B35)
                .setDescription('❌ No se encontraron datos de precio para este item')
                .setFooter({ text: 'Verifica que el nombre del item sea correcto' })
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        // Organizar datos por calidad y precio
        const qualityNames = {
            1: 'Normal',
            2: 'Bueno', 
            3: 'Excepcional',
            4: 'Excelente',
            5: 'Obra Maestra'
        };

        // Separar precios de venta y compra
        const sellData = priceData.filter(item => item.sell_price_min > 0)
            .sort((a, b) => a.sell_price_min - b.sell_price_min);
        
        const buyData = priceData.filter(item => item.buy_price_max > 0)
            .sort((a, b) => b.buy_price_max - a.buy_price_max);

        const embed = new EmbedBuilder()
            .setTitle(`💰 ${getItemDisplayName(itemCode)}`)
            .setColor(0x00FF00)
            .setTimestamp();

        // Sección de Ventas
        if (sellData.length > 0) {
            let sellText = '';
            let priceText = '';
            let timeText = '';
            
            sellData.slice(0, 10).forEach(item => {
                const quality = qualityNames[item.quality] || 'Desconocido';
                const timeAgo = getTimeAgo(item.sell_price_min_date);
                
                sellText += `${item.city} - ${quality}\n`;
                priceText += `${item.sell_price_min.toLocaleString()}\n`;
                timeText += `${timeAgo}\n`;
            });

            embed.addFields(
                { name: '📍 Ubicaciones - (Venta)', value: sellText || 'Sin datos', inline: true },
                { name: '💰 Precio', value: priceText || 'Sin datos', inline: true },
                { name: '🕐 Última actualización', value: timeText || 'Sin datos', inline: true }
            );
        }

        // Sección de Compras
        if (buyData.length > 0) {
            let buyText = '';
            let buyPriceText = '';
            let buyTimeText = '';
            
            buyData.slice(0, 6).forEach(item => {
                const quality = qualityNames[item.quality] || 'Desconocido';
                const timeAgo = getTimeAgo(item.buy_price_max_date);
                
                buyText += `${item.city} - ${quality}\n`;
                buyPriceText += `${item.buy_price_max.toLocaleString()}\n`;
                buyTimeText += `${timeAgo}\n`;
            });

            embed.addFields(
                { name: '📍 Ubicaciones - (Compra)', value: buyText || 'Sin datos', inline: true },
                { name: '💰 P. de Compra', value: buyPriceText || 'Sin datos', inline: true },
                { name: '🕐 Última actualización', value: buyTimeText || 'Sin datos', inline: true }
            );
        }

        embed.setFooter({ text: 'Datos de west.albion-online-data.com • Actualizado automáticamente' });

        await interaction.editReply({ embeds: [embed] });
        
    } catch (error) {
        console.error('Error obteniendo precios:', error);
        
        const embed = new EmbedBuilder()
            .setTitle(`💰 Precios - ${itemName}`)
            .setColor(0xFF0000)
            .addFields(
                { name: '❌ Error', value: 'No se pudieron obtener los precios en este momento', inline: false }
            )
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    }
}

async function handleCompare(interaction) {
    const itemName = interaction.options.getString('item');
    await interaction.deferReply();

    try {
        // Obtener precios de todas las ciudades principales
        const cities = ['Caerleon', 'Bridgewatch', 'Fort Sterling', 'Lymhurst', 'Martlock', 'Thetford'];
        const itemCode = await translateItemNameDynamic(itemName);
        const url = `https://west.albion-online-data.com/api/v2/stats/prices/${itemCode}.json?locations=${cities.join(',')}`;
        const response = await axios.get(url);
        const priceData = response.data;

        if (!priceData || priceData.length === 0) {
            return await interaction.editReply({ 
                content: `❌ No se encontraron datos de precio para **${getItemDisplayName(itemCode)}**`,
                ephemeral: true 
            });
        }

        // Filtrar por calidad 2 (normal) para consistencia
        const normalQualityData = priceData.filter(data => data.quality === 2);
        const dataToUse = normalQualityData.length > 0 ? normalQualityData : priceData;

        const embed = new EmbedBuilder()
            .setTitle(`📊 Comparación de Precios - ${getItemDisplayName(itemCode)}`)
            .setColor(0x32CD32)
            .setDescription('Comparación de precios entre ciudades (Calidad Normal)')
            .setTimestamp();

        // Organizar datos por ciudad y crear tabla
        let comparisonData = '';
        cities.forEach(city => {
            const cityData = dataToUse.find(item => item.city === city);
            if (cityData) {
                const buyPrice = cityData.buy_price_max ? `${cityData.buy_price_max.toLocaleString()}` : 'N/A';
                const sellPrice = cityData.sell_price_min ? `${cityData.sell_price_min.toLocaleString()}` : 'N/A';
                comparisonData += `🏪 **${city}**\n`;
                comparisonData += `   🔻 Compra: ${buyPrice} silver\n`;
                comparisonData += `   🔺 Venta: ${sellPrice} silver\n\n`;
            } else {
                comparisonData += `🏪 **${city}**: Sin datos\n\n`;
            }
        });

        embed.addFields({
            name: '💰 Precios por Ciudad',
            value: comparisonData || 'No hay datos disponibles',
            inline: false
        });

        embed.setFooter({ text: 'Datos de west.albion-online-data.com' });

        await interaction.editReply({ embeds: [embed] });

    } catch (error) {
        console.error('Error comparing prices:', error);
        await interaction.editReply({ 
            content: '❌ Error al consultar los precios. Intenta más tarde.',
            ephemeral: true 
        });
    }
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


// Función para calcular tiempo transcurrido
function getTimeAgo(dateString) {
    if (!dateString) return 'Desconocido';
    
    const now = new Date();
    const itemDate = new Date(dateString);
    const diffMs = now - itemDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
        return `${diffHours} h y ${diffMins} min`;
    } else {
        return `${diffMins} min`;
    }
}

// Sistema de precios de Albion Online
async function fetchAlbionPrices(itemName, city) {
    try {
        // Traducir nombre a código usando la API dinámica
        const itemCode = await translateItemNameDynamic(itemName);
        const url = `https://west.albion-online-data.com/api/v2/stats/prices/${itemCode}.json?locations=${city}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching Albion prices:', error);
        return null;
    }
}

// Sistema de alertas de precio
const ALERTS_FILE = path.join(__dirname, '..', 'price-alerts.json');

function loadAlerts() {
    try {
        if (fs.existsSync(ALERTS_FILE)) {
            return JSON.parse(fs.readFileSync(ALERTS_FILE, 'utf8'));
        }
    } catch (error) {
        console.error('Error cargando alertas:', error);
    }
    return [];
}

function saveAlerts(alerts) {
    try {
        fs.writeFileSync(ALERTS_FILE, JSON.stringify(alerts, null, 2));
    } catch (error) {
        console.error('Error guardando alertas:', error);
    }
}

async function handleAlert(interaction) {
    const item = interaction.options.getString('item');
    const precio = interaction.options.getInteger('precio');
    const ciudad = interaction.options.getString('ciudad') || 'Caerleon';
    const userId = interaction.user.id;
    
    await interaction.deferReply();

    // Cargar alertas existentes
    const alerts = loadAlerts();
    
    // Verificar si ya existe una alerta similar
    const existingAlert = alerts.find(alert => 
        alert.userId === userId && 
        alert.item === item && 
        alert.ciudad === ciudad
    );

    if (existingAlert) {
        // Actualizar precio de alerta existente
        existingAlert.precio = precio;
        existingAlert.createdAt = new Date().toISOString();
    } else {
        // Crear nueva alerta
        const newAlert = {
            id: Date.now().toString(),
            userId: userId,
            username: interaction.user.username,
            item: item,
            precio: precio,
            ciudad: ciudad,
            createdAt: new Date().toISOString(),
            active: true
        };
        alerts.push(newAlert);
    }

    saveAlerts(alerts);

    const embed = new EmbedBuilder()
        .setTitle('🔔 Alerta de Precio Configurada')
        .setColor(0x00FF00)
        .addFields(
            { name: '📦 Item', value: item, inline: true },
            { name: '🏪 Ciudad', value: ciudad, inline: true },
            { name: '💰 Precio Objetivo', value: `${precio.toLocaleString()} plata`, inline: true },
            { name: '📱 Estado', value: 'Te notificaré cuando el precio baje de este valor', inline: false }
        )
        .setFooter({ text: 'Usa /market alerts para ver todas tus alertas' })
        .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
}

async function handleAlerts(interaction) {
    const userId = interaction.user.id;
    await interaction.deferReply();

    const alerts = loadAlerts();
    const userAlerts = alerts.filter(alert => alert.userId === userId && alert.active);

    if (userAlerts.length === 0) {
        const embed = new EmbedBuilder()
            .setTitle('🔔 Tus Alertas')
            .setColor(0xFFD700)
            .setDescription('No tienes alertas activas.\nUsa `/market alert` para crear una nueva alerta.')
            .setTimestamp();

        return await interaction.editReply({ embeds: [embed] });
    }

    const embed = new EmbedBuilder()
        .setTitle('🔔 Tus Alertas Activas')
        .setColor(0x00FF00)
        .setDescription(`Tienes ${userAlerts.length} alerta(s) activa(s)`)
        .setTimestamp();

    userAlerts.forEach((alert, index) => {
        const createdDate = new Date(alert.createdAt).toLocaleDateString();
        embed.addFields({
            name: `${index + 1}. ${alert.item}`,
            value: `🏪 ${alert.ciudad}\n💰 Precio objetivo: ${alert.precio.toLocaleString()} plata\n📅 Creada: ${createdDate}`,
            inline: true
        });
    });

    // Botón para limpiar alertas
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('clear_alerts')
                .setLabel('🗑️ Limpiar Todas')
                .setStyle(ButtonStyle.Danger)
        );

    await interaction.editReply({ embeds: [embed], components: [row] });
}