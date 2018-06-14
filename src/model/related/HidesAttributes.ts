export default class HidesAttributes
{
    public hidden: Array<string> = [];

    public getHidden(): Array<string>
    {
        return this.hidden;
    }

    public setHidden(keys: Array<string>): void
    {
        this.hidden = keys.slice();
    }
}
