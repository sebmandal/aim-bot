import * as Discord from "discord.js";
import { readdir, readdirSync } from "fs";

const execute = async (
	client: Discord.Client,
	interaction: Discord.CommandInteraction,
) => {
	const commands = readdirSync("./dist/commands", "utf8").map((file) =>
		file.replace(".js", ""),
	);

	const fields = commands.map((command) => {
		const name = require(`../commands/${command}`).name;
		const description = require(`../commands/${command}`).description;
		return { name, value: description };
	});

	const embed = new Discord.MessageEmbed({
		title: "Help",
		fields: fields,
	});
	return interaction.followUp({
		embeds: [embed],
	});
};

module.exports = {
	name: "hjelp",
	description: "Informasjon om botten",
	type: 1,
	options: [],
	run: async (client: Discord.Client, interaction: any) => {
		await interaction.deferReply({ ephemeral: false }); // Bot is thinking...

		return await execute(client, interaction);
	},
};
