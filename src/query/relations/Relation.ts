import models from 'model/stores/models';
import Builder from 'query/Builder';


export default class Relation
{
    protected model: any;
    protected related: string;
    protected foreignKey: string;
    protected localKey: string;

    public constructor(model: object, related: string)
    {
        this.model = model;
        this.related = related;
    }

    public get()
    {

    }

    public getRelatedTableName(): string
    {
        const Model = models.getModel(this.related);
        let table: string = '';

        if (!Model.hasOwnProperty('table')) {
            table = Model.name.toLowerCase() + 's';
        } else {
            table = Model.table;
        }

        return table;
    }

    public buildQuery(): Builder
    {
        return new Builder(this.getRelatedTableName());
    }
}
