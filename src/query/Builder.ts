import { DB } from 'connection';
import models from 'model/stores/models';
import { JoinType } from 'query/constants';
import { Join, Order, Where } from 'query/expressions';
import Compiler from './Compiler';


export default class Builder
{
    // The model class associated with this query. If there is a model class, it will be used to transform
    // returned row(s) into model instances
    public model: string = '';

    // Select distinct
    public isDistinct: boolean = false;
    public isUpdate: boolean = false;

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
    public updates: object = {};
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
        const sql = this.compiler.compileSelect(this);
        let rows = this.transformRows(await DB.run(sql));

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

    public setModel(model: string): Builder
    {
        this.model = model;
        this.from(models.getModel(model).table);

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

        if (isFirst) {
            this.limit(1);
        }

        return this;
    }

    public toSql(): string
    {
        return this.compiler.compileSelect(this);
    }

    private transformRows(rows: Array<any>): Array<any>
    {
        if (!this.model) {
            return rows;
        }

        const Model = models.getModel(this.model);

        return rows.map(row => new Model(row));
    }

    public async update(updates): Promise<any>
    {
        this.isUpdate = true;
        this.updates = Object.assign({}, this.updates, updates);

        const sql = this.compiler.compileUpdate(this);
        return await DB.run(sql);
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
