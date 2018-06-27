import * as mysql from 'mysql';
import { SORT_DIRECTIONS } from '../constants';


export default class Order
{
    column: string;
    direction: string = 'asc';

    constructor(column: string, direction: string = 'asc')
    {
        if (SORT_DIRECTIONS.indexOf(direction) === -1) {
            throw `Order direction is not valid: ${direction}`;
        }

        this.column = column;
        this.direction = direction;
    }

    public toString(): string
    {
        return `${mysql.escapeId(this.column)} ${mysql.escapeId(this.direction.toUpperCase())}`;
    }
}
