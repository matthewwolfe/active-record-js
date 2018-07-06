export default class ArrayCollection
{
    private data: Array<any> = [];
    private Collection;

    constructor(data: Array<any>, Collection)
    {
        this.data = data;
        this.Collection = Collection;

        return new Proxy(this, {
            get: (_, property: any) => {
                if (Number.isInteger(parseInt(property.toString()))) {
                    return this.data[property];
                }

                return this[property];
            }
        });
    }

    public newInstance(data)
    {
        return this.Collection.initialize(data);
    }

    public get length(): number
    {
        return this.data.length;
    }

    public concat(...values: any[]): ArrayCollection
    {
        return this.newInstance(this.data.concat(values));
    }

    public copyWithin(target: number, start?: number, end?: number): ArrayCollection
    {
        this.data.copyWithin(target, start, end);
        return this;
    }

    public entries(): IterableIterator<[number, any]>
    {
        return this.data.entries();
    }

    public every(fn: (value: any, index: number, array: any[]) => boolean, thisArg: any): boolean
    {
        return this.data.every(fn, thisArg);
    }

    public fill(value: any, start?: number, end?: number): ArrayCollection
    {
        this.data.fill(value, start, end);
        return this;
    }

    public filter(fn: (value: any, index: number, array: Array<any>) => any, thisArg: any): ArrayCollection
    {
        return this.newInstance(this.data.filter(fn, thisArg));
    }

    public find(fn, thisArg): any
    {
        return this.data.find(fn, thisArg);
    }

    public findIndex(fn, thisArg): number
    {
        return this.data.findIndex(fn, thisArg);
    }

    public forEach(fn, thisArg)
    {
        return this.data.forEach(fn, thisArg);
    }

    public groupBy(key: number|string): any
    {
        return this.newInstance(this.data.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {}));
    }

    public includes(element: any, fromIndex?: number): boolean
    {
        return this.data.includes(element, fromIndex);
    }

    public indexOf(element: any, fromIndex?: number): any
    {
        return this.data.indexOf(element, fromIndex);
    }

    public join(separator?: string): string
    {
        return this.data.join(separator);
    }

    public keys(): IterableIterator<number>
    {
        return this.data.keys();
    }

    public lastIndexOf(element, fromIndex?: number): any|number
    {
        return this.data.lastIndexOf(element, fromIndex);
    }

    public map(fn, thisArg): ArrayCollection
    {
        return this.newInstance(this.data.map(fn, thisArg));
    }

    public pluck(property: string): Array<any>
    {
        return this.data.map(element => element[property]);
    }

    public pop(): any|undefined
    {
        return this.data.pop();
    }

    public push(...elements: Array<any>): number
    {
        return this.data.push(elements);
    }

    public reduce(fn, initialValue)
    {
        return this.data.reduce(fn, initialValue);
    }

    public reduceRight(fn, initialValue)
    {
        return this.data.reduceRight(fn, initialValue);
    }

    public reverse(): ArrayCollection
    {
        this.data.reverse();
        return this;
    }

    public shift(): any
    {
        return this.data.shift();
    }

    public slice(): any
    {
        return this.data.slice();
    }

    public some(fn, thisArg): boolean
    {
        return this.data.some(fn, thisArg);
    }

    public sort(fn): ArrayCollection
    {
        this.data.sort(fn);
        return this;
    }

    public splice(start, deleteCount, ...elements): ArrayCollection
    {
        this.data.splice(start, deleteCount, elements);
        return this;
    }

    public toArray(): Array<any>
    {
        return this.data;
    }

    public toJSON()
    {
        return this.data;
    }

    public toString(): string
    {
        return this.data.toString();
    }

    public unshift(...elements: Array<any>): number
    {
        return this.data.unshift(elements);
    }

    public values(): IterableIterator<any>
    {
        return this.data.values();
    }
}
