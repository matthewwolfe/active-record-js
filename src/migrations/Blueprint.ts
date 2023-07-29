import * as mysql from 'mysql2';
import { Column, IntegerColumn } from './columns';
import { ColumnType } from './constants';


export default class Blueprint
{
    private charset: string = 'utf8';
    private collate: string = 'utf8_unicode_ci';
    private columns: Array<Column> = [];
    private primaryKey: string = 'id';
    private table: string;

    public constructor(table: string)
    {
        this.table = table;
    }

    public bigInteger(name: string, options: any = {})
    {
        this.columns.push(new IntegerColumn(name, ColumnType.BIG_INTEGER, options));
    }

    public blob(name: string)
    {
        this.columns.push(new Column(name, ColumnType.BLOB));
    }

    public char(name: string)
    {
        this.columns.push(new Column(name, ColumnType.CHAR));
    }

    public date(name: string)
    {
        this.columns.push(new Column(name, ColumnType.DATE));
    }

    public dateTime(name: string)
    {
        this.columns.push(new Column(name, ColumnType.DATETIME));
    }

    public decimal(name: string, options: any = {})
    {
        this.columns.push(new Column(name, ColumnType.DECIMAL, options));
    }

    public double(name: string, options: any = {})
    {
        this.columns.push(new Column(name, ColumnType.DOUBLE, options));
    }

    public enum(name: string)
    {
        this.columns.push(new Column(name, ColumnType.ENUM));
    }

    public float(name: string)
    {
        this.columns.push(new Column(name, ColumnType.FLOAT));
    }

    public integer(name: string, options: any = {})
    {
        this.columns.push(new IntegerColumn(name, ColumnType.INTEGER, options));
    }

    public longText(name: string)
    {
        this.columns.push(new Column(name, ColumnType.LONG_TEXT));
    }

    public mediumInteger(name: string, options: any = {})
    {
        this.columns.push(new IntegerColumn(name, ColumnType.MEDIUM_INTEGER, options));
    }

    public mediumText(name: string)
    {
        this.columns.push(new Column(name, ColumnType.MEDIUM_TEXT));
    }

    public smallInteger(name: string, options: any = {})
    {
        this.columns.push(new IntegerColumn(name, ColumnType.SMALL_INTEGER, options));
    }

    public text(name: string)
    {
        this.columns.push(new Column(name, ColumnType.TEXT));
    }

    public time(name: string)
    {
        this.columns.push(new Column(name, ColumnType.TIME));
    }

    public timetamp(name: string)
    {
        this.columns.push(new Column(name, ColumnType.TIMESTAMP));
    }

    public tinyInteger(name: string, options: any = {})
    {
        this.columns.push(new IntegerColumn(name, ColumnType.TINY_INTEGER, options));
    }

    public varchar(name: string, options: any = {})
    {
        this.columns.push(new Column(name, ColumnType.VARCHAR, options));
    }

    public year(name: string)
    {
        this.columns.push(new Column(name, ColumnType.YEAR));
    }

    public compile(): string
    {
        const expressions: Array<string> = [];
        expressions.push('CREATE TABLE', mysql.escapeId(this.table), '(');

        expressions.push(
            this.columns.map(column => column.toString()).join(', ')
        );

        expressions.push(',', 'PRIMARY KEY', '(', mysql.escapeId(this.primaryKey), ')');
        expressions.push(')');

        expressions.push('DEFAULT CHARSET', this.charset);
        expressions.push('COLLATE', this.collate);

        return expressions.join(' ').trim();
    }
}
