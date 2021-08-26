import * as Discord from "discord.js";
import { readFileSync } from "fs";

const execute = async (client: Discord.Client, interaction: any) => {
	// read all sexualities from the file
	const sexualities = JSON.parse(
		readFileSync("./data/sexuality.json", "utf8"),
	);

	if (!interaction.options.get("input")) {
		const embed = new Discord.MessageEmbed({
			title: "Seksualiteter",
			description: sexualities
				.map((sexuality: any) => sexuality.name)
				.join(",\n"),
		});
		return await interaction.followUp({ embeds: [embed] });
	}

	// example: { name: "gay", id: "Discord role ID" }
	const input = interaction.options.get("input").value;
	const sexuality = sexualities.find(
		(sexuality: any) => sexuality.name === input,
	);

	interaction.member.roles.cache.forEach((role: Discord.Role) => {
		sexualities.forEach((sexuality: any) => {
			if (role.name.toLowerCase() === sexuality.name.toLowerCase()) {
				interaction.member.roles.remove(role);
			}
		});
	});

	if (!sexuality) {
		// if the sexuality is not found, return an error
		return await interaction.followUp(
			"Unfortunately, that sexuality doesn't exist in our database! <@!399596706402009100> go add it",
		);
	} else {
		// otherwise, return the sexuality
		await interaction.member.roles.add(sexuality.id);
		return await interaction.followUp("Gave you the role!");
	}
};

module.exports = {
	name: "seksualitet",
	description: "Se alle og endre din Discord seksualitet",
	type: 1,
	options: [
		{
			name: "input",
			type: 3,
			description: "Din seksualitet",
			required: false,
		},
	],
	run: async (client: Discord.Client, interaction: any) => {
		await interaction.deferReply({ ephemeral: false }); // Bot is thinking...

		await execute(client, interaction);
	},
};
