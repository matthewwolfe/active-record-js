import Event from './Event';


export default class ModelSaved extends Event
{
    public model: any;
    public type: string = 'model-saved';

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
