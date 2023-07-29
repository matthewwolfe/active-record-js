import * as mysql from 'mysql2';
import Relation from './Relation';


export default class BelongsToMany extends Relation
{
    protected pivot: string;
    protected foreignPivotKey: string;
    protected localPivotKey: string;

    constructor(model: object, related: string, pivot: string, foreignPivotKey: string, localPivotKey: string)
    {
        super(model, related);

        this.pivot = pivot;
        this.foreignPivotKey = foreignPivotKey;
        this.localPivotKey = localPivotKey;

        this.localKey = 'id';
    }

    public buildQuery()
    {
        return super.buildQuery()
            .join(this.pivot, `${this.pivot}.${this.localPivotKey}`, '=', `${this.getRelatedTableName()}.id`)
            .where(`${this.pivot}.${this.foreignPivotKey}`, '=', this.getLocalKeyValue());
    }
}
