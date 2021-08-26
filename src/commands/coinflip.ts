import * as Discord from "discord.js";

const execute = async (client: Discord.Client, interaction: any) => {
	const coinSide = Math.random() > 0.5 ? "Heads" : "Tails";
	return await interaction.followUp(`${coinSide}!`);
};

module.exports = {
	name: "coinflip",
	description: "Heads or tails, that is the question!",
	type: 1,
	options: [],
	run: async (client: Discord.Client, interaction: any) => {
		await interaction.deferReply({ ephemeral: false }); // Bot is thinking...

		return await execute(client, interaction);
	},
};
