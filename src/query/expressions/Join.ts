import * as mysql from 'mysql';
import { JoinType } from 'query/constants';

export default class Join
{
    private table: string;
    private localKey: string;
    private operator: string;
    private foreignKey: string;
    private type: string = JoinType.Inner;

    constructor(table: string, localKey: string, operator: string, foreignKey: string, type?: JoinType)
    {
        this.table = table;
        this.localKey = localKey;
        this.operator = operator;
        this.foreignKey = foreignKey;

        if (type) {
            this.type = type;
        }
    }

    public toString()
    {
        return `${this.type} ${mysql.escapeId(this.table)} ON ${mysql.escapeId(this.localKey)} ${this.operator} ${mysql.escapeId(this.foreignKey)}`;
    }
}
