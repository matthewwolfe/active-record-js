import { JoinType } from 'query/constants';
import { Join, Order, Where } from 'query/expressions';
import Compiler from './Compiler';


export default class Builder
{
    public isDistinct: boolean = false;
    public isFirst: boolean = false;
    public selects: Array<string> = [];
    public from: string = '';
    public groups: Array<any> = [];
    public havings: Array<any> = [];
    public joins: Array<any> = [];
    public limits: number;
    public offsets: number;
    public orders: Array<Order> = [];
    public wheres: Array<Where> = [];

    private compiler: Compiler;

    constructor(from: string)
    {
        this.from = from;
        this.selects = [`${this.from}.*`];

        this.compiler = new Compiler();
    }

    public distinct()
    {
        this.isDistinct = true;
        return this;
    }

    public get()
    {
        if (this.isFirst) {
            this.limit(1);
        }

        const sql = this.compiler.compileSelect(this);
        console.log(sql);
    }

    public groupBy(groups: Array<string>)
    {
        this.groups = groups;
    }

    public join(table: string, localKey: string, operator: string, foreignKey: string)
    {
        this.joins.push(new Join(table, localKey, operator, foreignKey, JoinType.Inner));
        return this;
    }

    public limit(limit: number)
    {
        if (!Number.isInteger(limit)) {
            throw `Limit must be an integer: ${limit}`;
        }

        this.limits = limit;
        return this;
    }

    public offset(offset: number)
    {
        if (!Number.isInteger(offset)) {
            throw `Offset must be an integer: ${offset}`;
        }

        this.offsets = offset;
        return this;
    }

    public orderBy(column: string, direction?: string)
    {
        this.orders.push(new Order(column, direction));
        return this;
    }

    public select(selects: Array<string>)
    {
        this.selects = selects.slice();
        return this;
    }

    public setIsFirst(isFirst: boolean)
    {
        this.isFirst = isFirst;
        return this;
    }

    public where(column: string, operator: string, value: number|string)
    {
        this.wheres.push(new Where(column, operator, value));
        return this;
    }

    public whereIn(column: string, value: Array<number|string>)
    {
        this.wheres.push(new Where(column, 'in', value));
        return this;
    }
}
