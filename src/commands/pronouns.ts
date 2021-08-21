import * as Discord from "discord.js";
import { readFileSync } from "fs";

const execute = async (client: Discord.Client, interaction: any) => {
	// read all pronouns from the file
	const pronouns = JSON.parse(readFileSync("./data/pronouns.json", "utf8"));

	if (!interaction.options.get("input")) {
		const embed = new Discord.MessageEmbed({
			title: "Pronouns",
			description: pronouns
				.map((pronoun: any) => pronoun.name)
				.join(",\n"),
		});
		return await interaction.followUp({ embeds: [embed] });
	}

	// example: { name: "he/him", id: "0001" }
	const input = interaction.options.get("input").value;
	const pronoun = pronouns.find((pronoun: any) => pronoun.name === input);

	interaction.member.roles.cache.forEach((role: Discord.Role) => {
		pronouns.forEach((pronoun: any) => {
			if (role.name.toLowerCase() === pronoun.name.toLowerCase()) {
				interaction.member.roles.remove(role);
			}
		});
	});

	if (!pronoun) {
		// if the pronoun is not found, return an error
		return await interaction.followUp(
			"Unfortunately, that pronoun doesn't exist! <@!399596706402009100> go add it",
		);
	} else {
		// otherwise, return the pronoun
		await interaction.member.roles.add(pronoun.id);
		return await interaction.followUp("Gave you the role!");
	}
};

module.exports = {
	name: "pronouns",
	description: "Change your pronouns",
	type: 1,
	options: [
		{
			name: "input",
			type: 3,
			description: "Your pronouns",
			required: false,
		},
	],
	run: async (client: Discord.Client, interaction: any) => {
		await interaction.deferReply({ ephemeral: false }); // Bot is thinking...

		await execute(client, interaction);
	},
};
