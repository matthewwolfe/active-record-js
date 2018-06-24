declare class Blueprint
{
    public constructor(table: string);
    public bigInteger(name: string, options: any);
    public blob(name: string);
    public char(name: string);
    public date(name: string);
    public dateTime(name: string);
    public decimal(name: string, options: any)
    public double(name: string, options: any)
    public enum(name: string)
    public float(name: string)
    public integer(name: string, options: any)
    public longText(name: string)
    public mediumInteger(name: string, options: any)
    public mediumText(name: string)
    public smallInteger(name: string, options: any)
    public text(name: string)
    public time(name: string)
    public timetamp(name: string)
    public tinyInteger(name: string, options: any)
    public varchar(name: string, options: any)
    public year(name: string)
    public compile(): string
}

declare class Builder
{
    constructor();
    public distinct();
    public first();
    public from(table: string): Builder;
    public get(): Promise<any>;
    public groupBy(groups: Array<string>): Builder;
    public insert(attributes: object): Promise<number>;
    public join(table: string, localKey: string, operator: string, foreignKey: string): Builder;
    public limit(limit: number): Builder;
    public setModel(model: string): Builder;
    public offset(offset: number): Builder;
    public orderBy(column: string, direction?: string): Builder;
    public select(selects: Array<string>): Builder;
    public setIsFirst(isFirst: boolean): Builder;
    public toSql(): string;
    public update(updates): Promise<any>;
    public where(column: string, operator: string, value: number|string): Builder;
    public whereIn(column: string, value: Array<number|string>): Builder;
}

declare class Emitter
{
    public static addListener(event: any, fn: (...args: any[]) => any);
    public static emit(event: any): void;
}

declare class Model
{
    public static findById(id: number): Promise<Model>;
    public save(): Promise<boolean>;
    public static select(select: Array<string>): Builder;
}

declare class Schema
{
    public static createTable(table: string, fn: Function);
    public static drop(table: string): Promise<boolean>;
    public static dropIfExists(table: string): Promise<boolean>;
    public static hasTable(table: string): Promise<boolean>;
}

declare function model(constructor: Function): void;
declare function relation(target: any, methodName: string): void;
