import Event from './Event';


export default class ModelSaving extends Event
{
    public model: any;
    public type: string = 'model-saving';

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
