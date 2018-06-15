import Relation from './Relation';


export default class HasOne extends Relation
{
    constructor(related: string, foreignKey: string, localKey: string)
    {
        super(related);

        this.related = related;
        this.foreignKey = foreignKey;
        this.localKey = localKey;
    }
}
