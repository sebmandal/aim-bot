import * as Discord from "discord.js";

const execute = async (client: Discord.Client, interaction: any) => {
	const diceAmount = parseInt(interaction.options.get("count").value);
	let diceRolls = [];
	// roll a dice x times
	for (let i = 0; i < diceAmount; i++) {
		const roll = Math.floor(Math.random() * 6) + 1;
		diceRolls.push(roll);
	}

	const diceRoll = "Your dice rolls: " + diceRolls.join(", ");
	return await interaction.followUp(diceRoll);
};

module.exports = {
	name: "dice",
	description: "Roll a dice!",
	type: 1,
	options: [
		{
			name: "count",
			type: 3,
			description: "The amount of dice to roll",
			required: true,
		},
	],
	run: async (client: Discord.Client, interaction: any) => {
		await interaction.deferReply({ ephemeral: false }); // Bot is thinking...

		return await execute(client, interaction);
	},
};
