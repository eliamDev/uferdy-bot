const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const DEVELOPER_ID = "474270462495686656";
const BONUSES_FILE = path.join(__dirname, "../daily-bonuses.json");

const CATEGORIES = {
  "cloth-armor": "🧥 Cloth Armor (Tela)",
  "leather-armor": "🥼 Leather Armor (Cuero)",
  "plate-armor": "🛡️ Plate Armor (Placas)",
  axes: "🪓 Axes",
  bows: "🏹 Bows",
  crossbows: "🏹 Crossbows",
  cursed: "💀 Cursed",
  daggers: "🗡️ Daggers",
  fire: "🔥 Fire",
  frost: "❄️ Frost",
  holy: "✨ Holy",
  maces: "🔨 Maces",
  nature: "🌿 Nature",
  quarterstaffs: "🦯 Quarterstaffs",
  spears: "🔱 Spears",
  swords: "⚔️ Swords",
  "war-gloves": "🥊 War Gloves",
  bags: "🎒 Bags",
  capes: "🧛 Capes",
  tools: "🔧 Tools",
  "off-hands": "🛡️ Off-hands",
  cooking: "🍳 Cooking",
  potions: "🧪 Potions",
  stone: "🪨 Stone",
  wood: "🪵 Wood",
  fiber: "🧵 Fiber",
  hide: "🦎 Hide",
  ore: "⛰️ Ore",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Bonificaciones diarias de Albion Online")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("view")
        .setDescription("Ver las bonificaciones diarias actuales")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription(
          "Establecer bonificaciones diarias (solo desarrollador)"
        )
        .addStringOption((option) =>
          option
            .setName("categoria1")
            .setDescription("Primera categoría con bonificación")
            .setRequired(true)
            .addChoices(
              { name: "Cloth Armor", value: "cloth-armor" },
              { name: "Leather Armor", value: "leather-armor" },
              { name: "Plate Armor", value: "plate-armor" },
              { name: "Axes", value: "axes" },
              { name: "Bows", value: "bows" },
              { name: "Crossbows", value: "crossbows" },
              { name: "Cursed", value: "cursed" },
              { name: "Daggers", value: "daggers" },
              { name: "Fire", value: "fire" },
              { name: "Frost", value: "frost" },
              { name: "Holy", value: "holy" },
              { name: "Maces", value: "maces" },
              { name: "Nature", value: "nature" },
              { name: "Quarterstaffs", value: "quarterstaffs" },
              { name: "Spears", value: "spears" },
              { name: "Swords", value: "swords" },
              { name: "War Gloves", value: "war-gloves" },
              { name: "Bags", value: "bags" },
              { name: "Capes", value: "capes" },
              { name: "Tools", value: "tools" },
              { name: "Off-hands", value: "off-hands" },
              { name: "Cooking", value: "cooking" },
              { name: "Potions", value: "potions" },
              { name: "Stone", value: "stone" },
              { name: "Wood", value: "wood" }
            )
        )
        .addIntegerOption((option) =>
          option
            .setName("bonus1")
            .setDescription("Porcentaje de bonificación (10 o 20)")
            .setRequired(true)
            .addChoices({ name: "10%", value: 10 }, { name: "20%", value: 20 })
        )
        .addStringOption((option) =>
          option
            .setName("categoria2")
            .setDescription("Segunda categoría con bonificación")
            .setRequired(true)
            .addChoices(
              { name: "Fiber", value: "fiber" },
              { name: "Hide", value: "hide" },
              { name: "Ore", value: "ore" },
              { name: "Cloth Armor", value: "cloth-armor" },
              { name: "Leather Armor", value: "leather-armor" },
              { name: "Plate Armor", value: "plate-armor" },
              { name: "Axes", value: "axes" },
              { name: "Bows", value: "bows" },
              { name: "Crossbows", value: "crossbows" },
              { name: "Cursed", value: "cursed" },
              { name: "Daggers", value: "daggers" },
              { name: "Fire", value: "fire" },
              { name: "Frost", value: "frost" },
              { name: "Holy", value: "holy" },
              { name: "Maces", value: "maces" },
              { name: "Nature", value: "nature" },
              { name: "Quarterstaffs", value: "quarterstaffs" },
              { name: "Spears", value: "spears" },
              { name: "Swords", value: "swords" },
              { name: "War Gloves", value: "war-gloves" },
              { name: "Bags", value: "bags" },
              { name: "Capes", value: "capes" },
              { name: "Tools", value: "tools" },
              { name: "Off-hands", value: "off-hands" }
            )
        )
        .addIntegerOption((option) =>
          option
            .setName("bonus2")
            .setDescription("Porcentaje de bonificación (10 o 20)")
            .setRequired(true)
            .addChoices({ name: "10%", value: 10 }, { name: "20%", value: 20 })
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    try {
      switch (subcommand) {
        case "view":
          await handleView(interaction);
          break;
        case "set":
          await handleSet(interaction);
          break;
      }
    } catch (error) {
      console.error("Error en comando daily:", error);
      await interaction.reply({
        content: "Error al procesar el comando.",
        ephemeral: true,
      });
    }
  },
};

async function handleView(interaction) {
  let bonusData;
  try {
    const data = fs.readFileSync(BONUSES_FILE, "utf8");
    bonusData = JSON.parse(data);
  } catch (error) {
    bonusData = { lastUpdate: null, bonuses: [] };
  }

  const embed = new EmbedBuilder()
    .setTitle("📅 Bonificaciones Diarias - Albion Online")
    .setColor(0xffd700);

  if (bonusData.bonuses.length === 0) {
    embed
      .setDescription("❌ No hay bonificaciones configuradas para hoy.")
      .addFields({
        name: "🔍 Cómo verificar en el juego",
        value:
          "Presiona **Alt+Y** o ve a **Actividades > Bonificaciones de Producción**",
        inline: false,
      });
  } else {
    embed.setDescription("✅ Bonificaciones activas para hoy:").addFields(
      ...bonusData.bonuses.map((bonus, index) => ({
        name: `Bonificación ${index + 1}`,
        value: `${CATEGORIES[bonus.category]} - **${bonus.bonus}%**`,
        inline: true,
      }))
    );

    if (bonusData.lastUpdate) {
      embed.setFooter({
        text: `Actualizado: ${new Date(bonusData.lastUpdate).toLocaleString(
          "es-ES"
        )}`,
      });
    }
  }

  embed.setTimestamp();
  await interaction.reply({ embeds: [embed] });
}

async function handleSet(interaction) {
  if (interaction.user.id !== DEVELOPER_ID) {
    await interaction.reply({
      content: "❌ Solo el desarrollador puede usar este comando.",
      ephemeral: true,
    });
    return;
  }

  const categoria1 = interaction.options.getString("categoria1");
  const bonus1 = interaction.options.getInteger("bonus1");
  const categoria2 = interaction.options.getString("categoria2");
  const bonus2 = interaction.options.getInteger("bonus2");

  if (categoria1 === categoria2) {
    await interaction.reply({
      content: "❌ Las dos categorías no pueden ser iguales.",
      ephemeral: true,
    });
    return;
  }

  const bonusData = {
    lastUpdate: new Date().toISOString(),
    bonuses: [
      { category: categoria1, bonus: bonus1 },
      { category: categoria2, bonus: bonus2 },
    ],
  };

  fs.writeFileSync(BONUSES_FILE, JSON.stringify(bonusData, null, 2));

  const embed = new EmbedBuilder()
    .setTitle("✅ Bonificaciones Actualizadas")
    .setColor(0x00ff00)
    .setDescription("Las bonificaciones diarias han sido configuradas:")
    .addFields(
      {
        name: "Bonificación 1",
        value: `${CATEGORIES[categoria1]} - **${bonus1}%**`,
        inline: true,
      },
      {
        name: "Bonificación 2",
        value: `${CATEGORIES[categoria2]} - **${bonus2}%**`,
        inline: true,
      }
    )
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
