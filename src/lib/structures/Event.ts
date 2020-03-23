import {GClient} from "..";

export class Events {
    public name: string;
    public bot?: GClient;

    constructor(name: string) {
        this.name = name;
    }
}
