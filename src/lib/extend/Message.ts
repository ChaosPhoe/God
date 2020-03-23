import {Message, Structures} from "discord.js";
import {GEmbed} from "..";

export = () => Structures.extend("Message", (msg) => {
    return class ZeMessage extends msg {
        sem(content: string, {type}: { type: "base" | "error" } = {type: "base"}): Promise<Message> {
            // @ts-ignore
            return this.channel.send(new GEmbed(this)[type]().setDescription(content))
        }

        embed(): GEmbed {
            return new GEmbed(this).base();
        }
    };
});
