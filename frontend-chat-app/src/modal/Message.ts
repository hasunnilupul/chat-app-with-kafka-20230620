export default class User {
    private _sender: string;
    private _content: string;
    private _timestamp?: string;

    constructor(sender: string, content: string, timestamp?: string) {
        this._sender = sender;
        this._content = content;
        this._timestamp = timestamp;
    }

    get sender(): string {
        return this._sender;
    }

    set sender(value: string) {
        this._sender = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get timestamp(): string {
        return <string>this._timestamp;
    }

    set timestamp(value: string) {
        this._timestamp = value;
    }
}