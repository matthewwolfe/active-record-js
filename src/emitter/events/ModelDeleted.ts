import Event from './Event';


export default class ModelDeleted extends Event
{
    public model: any;
    public type: string = 'model-deleted';

    constructor(model: any)
    {
        super();
        this.model = model;
    }

    public getMessage()
    {
        return this.model;
    }
}
