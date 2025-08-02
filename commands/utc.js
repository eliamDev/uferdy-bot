const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("utc")
    .setDescription("Muestra la hora actual en UTC"),

  async execute(interaction) {
    const now = new Date();
    const utcTime = now.toUTCString();
    const utcHour = now.getUTCHours().toString().padStart(2, "0");
    const utcMinute = now.getUTCMinutes().toString().padStart(2, "0");
    const utcSecond = now.getUTCSeconds().toString().padStart(2, "0");

    const embed = new EmbedBuilder().setColor(0x0099ff).addFields({
      name: "Hora",
      value: `${utcHour}:${utcMinute}:${utcSecond} UTC`,
      inline: false,
    });
    await interaction.reply({ embeds: [embed] });
  },
};
