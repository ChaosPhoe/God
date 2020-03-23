import {Message, MessageEmbed} from "discord.js";

export class GEmbed extends MessageEmbed {
    public message: Message;

    constructor(message: Message) {
        super(...arguments);
        this.message = message;
    }

    base() {
        return this
            .setColor("#8c227d")
            .setAuthor(this.message.author.username, this.message.author.displayAvatarURL())
            .setTimestamp()
    }

    error() {
        return this.base()
            .setColor("#ff0100")
    }
}
