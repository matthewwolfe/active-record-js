import Relation from './Relation';


export default class BelongsToMany extends Relation
{
    private related: string;
    private pivot: string;
    private foreignPivotKey: string;
    private localPivotKey: string;

    constructor(related: string, pivot: string, foreignPivotKey: string, localPivotKey: string)
    {
        super();

        this.related = related;
        this.pivot = pivot;
        this.foreignPivotKey = foreignPivotKey;
        this.localPivotKey = localPivotKey;
    }
}
