export default class HidesAttributes
{
    public static hidden: Array<string> = [];

    public getHidden(): Array<string>
    {
        return this.constructor['hidden'];
    }

    public setHidden(keys: Array<string>): void
    {
        this.constructor['hidden'] = keys.slice();
    }
}
