export default class MapCollection
{
    private data: Map<number|string, any> = new Map();
    private Collection;

    constructor(data: object, Collection)
    {
        this.data = new Map(Object.entries(data));
        this.Collection = Collection;
    }

    public newInstance(data)
    {
        return new this.Collection(data);
    }

    public get size(): number
    {
        return this.data.size;
    }

    public clear(): void
    {
        this.data.clear();
    }

    public delete(key: number|string): boolean
    {
        return this.data.delete(key);
    }

    public entries(): IterableIterator<[number|string, any]>
    {
        return this.data.entries();
    }

    public forEach(fn, thisArg)
    {
        this.data.forEach(fn, thisArg);
    }

    public get(key: number|string): any
    {
        return this.data.get(key.toString());
    }

    public has(key: number|string): boolean
    {
        return this.data.has(key.toString());
    }

    public keys(): IterableIterator<number|string>
    {
        return this.data.keys();
    }

    public set(key: number|string, value: any): MapCollection
    {
        this.data.set(key.toString(), value);
        return this;
    }

    public toMap(): Map<number|string, any>
    {
        return this.data;
    }

    public toString(): string
    {
        return this.data.toString();
    }

    public values(): IterableIterator<any>
    {
        return this.data.values();
    }
}
