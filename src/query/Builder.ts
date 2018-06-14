
import { Order, Where } from 'query/expressions';


export default class Builder
{
    public isDistinct: boolean = false;
    public selects: Array<string> = [];
    public from: string = '';
    public groups: Array<any> = [];
    public havings: Array<any> = [];
    public joins: Array<any> = [];
    public limits: number;
    public offsets: number;
    public orders: Array<Order> = [];
    public wheres: Array<Where> = [];

    constructor(from: string)
    {
        this.from = from;
        this.selects = [`${this.from}.*`];
    }

    public distinct()
    {
        this.isDistinct = true;
        return this;
    }

    public limit(limit: number)
    {
        this.limits = limit;
    }

    public offset(offset: number)
    {
        this.offsets = offset;
    }

    public orderBy(column: string, direction?: string)
    {
        this.orders.push(new Order(column, direction));
    }

    public select(selects: Array<string>)
    {
        this.selects = selects.slice();
        return this;
    }

    public where(column: string, operator: string, value: number|string)
    {
        this.wheres.push(new Where(column, operator, value));
        return this;
    }

    public whereIn(column: string, operator: string, value: Array<number|string>)
    {
        this.wheres.push(new Where(column, operator, value));
        return this;
    }
}
