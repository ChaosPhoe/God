import {Command} from "../../lib/";
import {Message} from "discord.js";

export = class extends Command {
    constructor() {
        super("help");
    }

    run(message: Message, [cmd]: string[]) {
        const helpEmbed = message.embed();
        if (cmd && this.bot!.getCommand(cmd)) {
            const command = this.bot!.getCommand(cmd)!;
            helpEmbed
                .setTitle(`Command: ${command.name}`)
                .setDescription([`**Category:** ${command.category}`, `**Aliases:** ${command.aliases!.join(" ")}`].join("\n"))
        } else {
            helpEmbed
                .setTitle("Commands");

            // @ts-ignore
            const categories = this.bot!.commands.reduce((acc, val) => acc.includes(val.category) ? acc : [...acc, val.category], []);
            categories.forEach((cat: string) => helpEmbed.addField(cat[0].toUpperCase() + cat.slice(1), this.bot!.commands.filter((c) => c.category == cat).map(x => `\`${x.name}\``).join(", ")));
        }

        message.channel.send(helpEmbed);
    }
}
