import * as mysql from 'mysql2';
import { OPERATORS } from '../constants';


export default class Where
{
    public static conditions = {
        AND: 'AND',
        OR: 'OR'
    };

    private column: string;
    public condition: string;
    private operator: string;
    private value: number|string|Array<number|string>;

    constructor(column: string, operator: string, value: number|string|Array<number|string>, condition?: string)
    {
        if (OPERATORS.indexOf(operator) === -1) {
            throw `where operator is not valid: ${operator}`;
        };

        if (!condition) {
            condition = Where.conditions.AND;
        }

        this.column = column;
        this.condition = condition;
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
