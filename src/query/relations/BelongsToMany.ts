import Relation from './Relation';


export default class BelongsToMany extends Relation
{
    protected pivot: string;
    protected foreignPivotKey: string;
    protected localPivotKey: string;

    constructor(related: string, pivot: string, foreignPivotKey: string, localPivotKey: string)
    {
        super(related);
        
        this.pivot = pivot;
        this.foreignPivotKey = foreignPivotKey;
        this.localPivotKey = localPivotKey;
    }
}
