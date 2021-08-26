import * as Discord from "discord.js";

module.exports = {
	name: "potet",
	description: "Daniela's favorite potato",
	type: 1,
	options: [],
	run: async (client: Discord.Client, interaction: any) => {
		await interaction.deferReply({ ephemeral: false }); // Bot is thinking...

		return await interaction.followUp(
			"https://tenor.com/view/yummy-funny-fries-poop-gif-13826567",
		);
	},
};
