import * as Discord from "discord.js";
import * as fs from "fs";

//! this seems to not work, so i'll just import them all manually
// const commands = fs
// 	.readdirSync("../commands")
// 	.map((currentFile) => require(`../commands/${currentFile}`));

const commands = [require("../commands/color")];

export const onInteractionCreate = async (
	client: Discord.Client,
	interaction: Discord.Interaction,
) => {
	if (!interaction.isCommand()) return;

	const command: string = interaction.commandName.toLowerCase();
	const args = interaction.options;

	// checking for a command name match, if it matches, execute it
	return commands.forEach(async (x: any) => {
		if (command === x.name) {
			// posting the callback to the client
			return await x
				.run(client, interaction, args)
				.catch((error: Error) =>
					interaction.followUp(
						`Sorry! An error occured with the following message:\n\`${error.message}\``,
					),
				);
		}
	});
};

export const onReady = async (client: Discord.Client) => {
	// loading the commands into the client
	const commandsInformation = commands.map((currentItem) => {
		return {
			name: currentItem["name"],
			description: currentItem["description"],
			options: currentItem["options"],
		};
	});

	// settings the commands on the application
	await client.application?.commands.set(commandsInformation);

	return console.log(`Listening to Discord on ${client.user.tag}!`);
};
