export default class HasAttributes
{
    public appends: Array<string> = [];
    public casts: object = {};

    public attributes: object = {};
    public changedAttributes: Array<string> = [];

    public fillAttributes(attributes: object)
    {
        for (const key in attributes) {
            this.attributes[key] = attributes[key];
        }
    }

    public getAttribute(key: string): any
    {
        return this.attributes[key];
    }

    public isDirty(): boolean
    {
        return this.changedAttributes.length > 1;
    }

    public setAttribute(key: string, value: any)
    {
        if (this.attributes[key] !== value && this.changedAttributes.indexOf(key) === -1) {
            this.changedAttributes.push(key);
        }

        this.attributes[key] = value;
    }
}
