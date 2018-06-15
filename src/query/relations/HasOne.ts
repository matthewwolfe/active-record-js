import Relation from './Relation';


export default class HasOne extends Relation
{
    private related: string;
    private foreignKey: string;
    private localKey: string;

    constructor(related: string, foreignKey: string, localKey: string)
    {
        super();

        this.related = related;
        this.foreignKey = foreignKey;
        this.localKey = localKey;
    }
}
