import {GClient} from "./lib";

require("dotenv").config({path: __dirname + "/../.env"});

const bot = new GClient();

bot.start(process.env.TOKEN!);
