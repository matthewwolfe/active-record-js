import * as mysql from 'mysql';
import ColumnOptions from './ColumnOptions';



export default class Column
{
    protected allowNull: boolean = true;
    protected comment: string = '';
    protected default: any;
    protected length: number;
    protected name: string;
    protected type: string;


    public constructor(name: string, type: string, options: ColumnOptions = null)
    {
        this.name = name;
        this.type = type;

        if (options.hasOwnProperty('allowNull')) {
            this.allowNull = options.allowNull;
        }

        if (options.hasOwnProperty('default')) {
            this.default = options.default;
        }

        if (options.hasOwnProperty('length')) {
            this.length = options.length;
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
