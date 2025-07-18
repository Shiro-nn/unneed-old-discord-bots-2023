import {Client} from "discord.js";
import mongoose from "mongoose";
import * as logger from "./utils/logger.js";
import events from "./events/_index.js";

await mongoose.connect(process.env.MONGO);
logger.log("Connected to MongoDB");

const client = new Client({
    intents: [
    ]
});

events(client);

await client.login(process.env.TOKEN);