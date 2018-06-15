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
        const Model = models.getModel(this.related);
        let table: string = '';

        if (!Model.hasOwnProperty('table')) {
            table = Model.name.toLowerCase() + 's';
        } else {
            table = Model.table;
        }

        return new Builder(table);
    }
}
