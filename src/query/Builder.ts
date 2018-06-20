import { DB } from 'connection';
import { JoinType } from 'query/constants';
import { Join, Order, Where } from 'query/expressions';
import Compiler from './Compiler';


export default class Builder
{
    // The model class associated with this query. If there is a model class, it will be used to transform
    // returned row(s) into model instances
    public Model: any;

    // Select distinct
    public isDistinct: boolean = false;

    // Limits the query to 1 and returns the first result if true
    public isFirst: boolean = false;

    public selects: Array<string> = [];

    // The base table of the query. All other tables are appended via joins
    public fromTable: string = '';

    public groups: Array<any> = [];
    public havings: Array<any> = [];
    public joins: Array<any> = [];
    public limits: number;
    public offsets: number;
    public orders: Array<Order> = [];
    public wheres: Array<Where> = [];

    // SQL compiler converts a query builder object into a SQL string
    private compiler: Compiler;

    constructor()
    {
        this.compiler = new Compiler();
    }

    public distinct()
    {
        this.isDistinct = true;
        return this;
    }

    public first()
    {
        this.setIsFirst(true);
        return this.get();
    }

    public from(table): Builder
    {
        this.fromTable = table;

        if (this.selects.length === 0) {
            this.selects.push(`${table}.*`);
        }

        return this;
    }

    public async get(): Promise<any>
    {
        if (this.isFirst) {
            this.limit(1);
        }

        const sql = this.compiler.compileSelect(this);
        const rows = await DB.run(sql);

        if (this.isFirst) {
            return rows[0];
        }

        return rows;
    }

    public groupBy(groups: Array<string>): Builder
    {
        this.groups = groups;
        return this;
    }

    public async insert(attributes: object): Promise<number>
    {
        const sql = this.compiler.compileInsert(this, attributes);
        const { insertId } = await DB.run(sql);
        return insertId;
    }

    public join(table: string, localKey: string, operator: string, foreignKey: string): Builder
    {
        this.joins.push(new Join(table, localKey, operator, foreignKey, JoinType.Inner));
        return this;
    }

    public limit(limit: number): Builder
    {
        if (!Number.isInteger(limit)) {
            throw `Limit must be an integer: ${limit}`;
        }

        this.limits = limit;
        return this;
    }

    public setModel(Model: any): Builder
    {
        this.Model = Model;
        this.from(Model.constructor.table);

        return this;
    }

    public offset(offset: number): Builder
    {
        if (!Number.isInteger(offset)) {
            throw `Offset must be an integer: ${offset}`;
        }

        this.offsets = offset;
        return this;
    }

    public orderBy(column: string, direction?: string): Builder
    {
        this.orders.push(new Order(column, direction));
        return this;
    }

    public select(selects: Array<string>): Builder
    {
        this.selects = selects.slice();
        return this;
    }

    public setIsFirst(isFirst: boolean): Builder
    {
        this.isFirst = isFirst;
        return this;
    }

    public toSql(): string
    {
        return this.compiler.compileSelect(this);
    }

    public where(column: string, operator: string, value: number|string): Builder
    {
        this.wheres.push(new Where(column, operator, value));
        return this;
    }

    public whereIn(column: string, value: Array<number|string>): Builder
    {
        this.wheres.push(new Where(column, 'in', value));
        return this;
    }
}
