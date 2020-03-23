import {Client, Collection} from "discord.js";
import {readdirSync} from "fs";
import {GEmbed, Command} from "..";

require("../extend/Message")();

declare module "discord.js" {

    interface Message {
        sem(content: string, {type}?: { type: "base" | "error" }): Promise<Message>;

        embed(): GEmbed;
    }
}

export class GClient extends Client {
    public commands = new Collection<string, Command>();
    public prefix = "z!";

    start(token?: string) {
        if (!token) throw Error("No token provided!");
        this.load({type: "commands", dir: `${__dirname}/../../commands`})
        this.load({type: "events", dir: `${__dirname}/../../events`});

        super.login(token);
    }

    load({type, dir}: { type: "commands" | "events", dir: string }) {
        if (type === "commands") {
            console.log("Loading Commands");
            readdirSync(dir).forEach((category) => {
                readdirSync(`${dir}/${category}`)
                    .filter(f => !f.endsWith(".d.ts"))
                    .forEach((command) => {
                        const Command = require(`${dir}/${category}/${command}`);
                        const cmd = new Command();
                        cmd.bot = this;
                        cmd.category = category;

                        // @ts-ignore
                        this.commands.set(cmd.name, cmd);
                        console.log(`Loaded => ${command}`);
                    });
            });
        } else {
            console.log("Loading Events");
            readdirSync(dir).forEach((category) => {
                readdirSync(`${dir}/${category}`)
                    .filter(f => !f.endsWith(".d.ts"))
                    .forEach((event) => {
                        const Event = require(`${dir}/${category}/${event}`);

                        const evt = new Event();

                        this.on(evt.name, evt.run.bind(null, this));
                        console.log(`Loaded => ${event}`);
                    });
            });
        }
    }

    getCommand(cmd: string) {
        return this.commands.get(cmd) || this.commands.find((command) => command.aliases!.includes(cmd));
    }
}
