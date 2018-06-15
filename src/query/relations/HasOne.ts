import Relation from './Relation';


export default class HasOne extends Relation
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
        const relatedTable = this.getRelatedTableName();
        const localKeyValue = this.model.getAttribute(this.localKey);

        return super.buildQuery()
            .where(`${relatedTable}.${this.foreignKey}`, '=', localKeyValue)
            .setIsFirst(true);
    }
}
