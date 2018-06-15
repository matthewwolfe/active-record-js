import Relation from './Relation';


export default class BelongsTo extends Relation
{
    constructor(related: string, foreignKey: string, localKey: string)
    {
        super(related);

        this.related = related;
        this.foreignKey = foreignKey;
        this.localKey = localKey;
    }
}
