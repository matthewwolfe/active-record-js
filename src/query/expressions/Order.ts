import * as mysql from 'mysql';
import { SORT_DIRECTIONS } from 'query/constants';


export default class Order
{
    column: string;
    direction: string = 'asc';

    constructor(column: string, direction?: string)
    {
        if (SORT_DIRECTIONS.indexOf(direction) === -1) {
            throw `Order direction is not valid: ${direction}`;
        }

        this.column = column;
        this.direction = direction;
    }

    public toString()
    {
        return `${mysql.escapeId(this.column)} ${mysql.escapeId(this.direction.toUpperCase())}`;
    }
}
