import {Events, GClient} from "../../lib";

export = class extends Events {
    constructor() {
        super("ready");
    }

    run(bot: GClient) {
        console.log("Bot has started!");
        bot.user!.setPresence({activity: {name: "Chaos is cool", type: "WATCHING"}});

    }
}
