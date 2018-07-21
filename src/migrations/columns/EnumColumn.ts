import * as mysql from 'mysql';
import Column from './Column';
import ColumnOptions from './ColumnOptions';


interface EnumColumnOptions extends ColumnOptions
{
    values: Array<string>;
}

export default class EnumColumn extends Column
{
    protected values: Array<string> = [];

    constructor(name: string, type: string, options: EnumColumnOptions = null)
    {
        super(name, type, options);
        this.values = options.values;
    }

    public toString()
    {
        const expressions: Array<string> = [
            mysql.escapeId(this.name),
            this.type,
            '('
        ];

        if (this.values.length > 0) {
            expressions.push(this.values.map(value => mysql.escape(value)).join(', '));
        }

        expressions.push(')');

        if (!this.allowNull) {
            expressions.push('NOT');
        }

        expressions.push('NULL');

        if (this.default !== undefined) {
            expressions.push('DEFAULT', this.default);
        }

        return expressions.join(' ').trim();
    }
}
