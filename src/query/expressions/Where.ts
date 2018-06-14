import * as mysql from 'mysql';
import { OPERATORS } from 'query/constants';


export default class Where
{
    private column: string;
    private operator: string;
    private value: number|string|Array<number|string>;

    constructor(column: string, operator: string, value: number|string|Array<number|string>)
    {
        if (OPERATORS.indexOf(operator) === -1) {
            throw `where operator is not valid: ${operator}`;
        };

        this.column = column;
        this.operator = operator;
        this.value = value;
    }

    private valueToString(): string
    {
        if (Array.isArray(this.value)) {
            return '(' + this.value.map(value => mysql.escape(value)).join(', ') + ')';
        }

        return mysql.escape(this.value);
    }

    public toString(): string
    {
        return `${mysql.escapeId(this.column)} ${this.operator.toUpperCase()} ${this.valueToString()}`;
    }
}
