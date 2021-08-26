import * as Discord from "discord.js";

const execute = async (client: Discord.Client, interaction: any) => {
	const admin = interaction.member.roles.cache.find(
		(role: any) => role.name === "Admin",
	);

	if (admin) {
		const color = interaction.options.get("color").value;
		const number = parseInt(interaction.options.get("number").value);
		interaction.guild.roles.create({
			name: `Color ${number}`,
			color: color,
		});

		return await interaction.followUp(`Created role Color ${number}`);
	} else {
		return await interaction.failure(
			`You don't have permission to do that.`,
		);
	}
};

module.exports = {
	name: "new_color",
	description: "Create a new color role, only for administrators!",
	type: 1,
	options: [
		{
			name: "color",
			type: 3,
			description: "Velg en farge",
			required: true,
		},
		{
			name: "number",
			type: 3,
			description: "Velg et nummer",
			required: true,
		},
	],
	run: async (client: Discord.Client, interaction: any) => {
		await interaction.deferReply({ ephemeral: false }); // Bot is thinking...

		return await execute(client, interaction);
	},
};
