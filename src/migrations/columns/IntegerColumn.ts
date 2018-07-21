import * as mysql from 'mysql';
import Column from './Column';
import ColumnOptions from './ColumnOptions';


interface IntegerColumnOptions extends ColumnOptions
{
    autoIncrement?: boolean
    signed?: boolean
}

export default class IntegerColumn extends Column
{
    protected autoIncrement: boolean = false;
    protected signed: boolean = true;

    constructor(name: string, type: string, options: IntegerColumnOptions = null)
    {
        super(name, type, options);

        if (options.hasOwnProperty('autoIncrement')) {
            this.autoIncrement = options.autoIncrement;
        }

        if (options.hasOwnProperty('signed')) {
            this.signed = options.signed;
        }
    }

    public toString()
    {
        const expressions: Array<string> = [
            mysql.escapeId(this.name),
            this.type
        ];

        if (this.length) {
            expressions.push(`(${this.length.toString()})`);
        }

        if (!this.signed) {
            expressions.push('UNSIGNED');
        } else {
            expressions.push('SIGNED');
        }

        if (!this.allowNull) {
            expressions.push('NOT');
        }

        expressions.push('NULL');

        if (this.default !== undefined) {
            expressions.push('DEFAULT', this.default);
        }

        if (this.autoIncrement) {
            expressions.push('AUTO_INCREMENT');
        }

        return expressions.join(' ').trim();
    }
}
