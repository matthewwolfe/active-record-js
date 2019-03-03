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
    }

    public buildQuery()
    {
        // TODO: Make this work
        return super.buildQuery();
    }
}
