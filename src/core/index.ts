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

// running the startup script (init commands, log that the bot is online, etc.)
import { onReady } from "./partials";
client.on("ready", async () => {
	return await onReady(client);
});

// running the command handler, taking in interactions from the user
import { onInteractionCreate } from "./partials";
client.on("interactionCreate", async (i: Discord.Interaction) => {
	return await onInteractionCreate(client, i);
});

// registring the bot onto the Discord API
client.login(process.env.TOKEN);
