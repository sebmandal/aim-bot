import * as Discord from "discord.js";

const execute = async (
	client: Discord.Client,
	interaction: Discord.CommandInteraction,
) => {
	const embed = new Discord.MessageEmbed({
		title: "Help",
		description: "This help command",
		fields: [
			{
				name: "/color",
				value: "Change your color",
			},
			{
				name: "/pronouns",
				value: "Change your pronouns",
			},
			{
				name: "/help",
				value: "This help message",
			},
		],
	});
	return interaction.followUp({
		embeds: [embed],
	});
};

module.exports = {
	name: "help",
	description: "Help command",
	type: 2,
	run: async (client: Discord.Client, interaction: any) => {
		await interaction.deferReply({ ephemeral: false }); // Bot is thinking...

		return await execute(client, interaction);
	},
};
