import * as Discord from "discord.js";

const execute = async (
	client: Discord.Client,
	interaction: Discord.CommandInteraction,
) => {
	const input = interaction.options.get("input").value;
	const member: any = interaction.member!;

	const colorRole = interaction.guild.roles.cache.find(
		(role: Discord.Role) => role.name === "Color " + input,
	);

	if (!colorRole) {
		return await interaction.followUp("Please provide a valid color");
	} else {
		member.roles.cache.forEach((role: Discord.Role) => {
			if (role.name.startsWith("Color ")) {
				member.roles.remove(role);
			}
		});
		member.roles.add(colorRole);
		return await interaction.followUp(
			`Successfully gave you the role, @${interaction.user.tag}.`,
		);
	}
};

module.exports = {
	name: "color",
	description: "Change your Discord color",
	type: 1,
	options: [
		{
			name: "input",
			type: 3,
			description: "Your color role number",
			required: true,
		},
	],
	run: async (client: Discord.Client, interaction: any) => {
		await interaction.deferReply({ ephemeral: false }); // Bot is thinking...

		return await execute(client, interaction);
	},
};
