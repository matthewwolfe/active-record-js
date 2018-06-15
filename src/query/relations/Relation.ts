import models from 'model/stores/models';
import Builder from 'query/Builder';


export default class Relation
{
    protected related: string;
    protected foreignKey: string;
    protected localKey: string;

    public constructor(related: string)
    {
        this.related = related;
    }

    public get()
    {

    }

    public buildQuery(): Builder
    {
        return new Builder(models.getModel(this.related).table);
    }
}
