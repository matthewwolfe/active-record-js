import Relation from './Relation';


export default class HasMany extends Relation
{
    constructor(model: object, related: string, foreignKey: string, localKey: string)
    {
        super(model, related);

        this.related = related;
        this.foreignKey = foreignKey;
        this.localKey = localKey;
    }
}
