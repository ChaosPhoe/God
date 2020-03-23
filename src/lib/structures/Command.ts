import {GClient} from "..";

export class Command {
    public name: string;
    public aliases?: string[];
    public bot?: GClient;
    public category?: string;

    public constructor(name: string, options: IOptions = {aliases: []}) {
        this.name = name;
        this.aliases = options!.aliases || [];
    }
}

export interface IOptions {
    aliases?: string[];
}
