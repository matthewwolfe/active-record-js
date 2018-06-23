import Relation from './Relation';


export default class HasMany extends Relation
{
    constructor(model: object, related: string, foreignKey: string, localKey: string = 'id')
    {
        super(model, related);

        this.related = related;
        this.foreignKey = foreignKey;
        this.localKey = localKey;
    }

    public buildQuery()
    {
        return super.buildQuery().where(`${this.getRelatedTableName()}.${this.foreignKey}`, '=', this.getLocalKeyValue());
    }
}
