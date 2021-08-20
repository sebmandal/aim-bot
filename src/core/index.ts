//dotenv setup
import * as dotenv from "dotenv";
dotenv.config();

//bot setup
import * as Discord from "discord.js";
const client: Discord.Client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.DIRECT_MESSAGES,
	],
});

import { onReady } from "./partials";
client.on("ready", async () => {
	return await onReady(client);
});

import { onInteractionCreate } from "./partials";
client.on("interactionCreate", async (i: Discord.Interaction) => {
	return await onInteractionCreate(client, i);
});

client.login(process.env.TOKEN);
