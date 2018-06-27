import Event from './Event';


export default class ModelUpdated extends Event
{
    public model: any;
    public type: string = 'model-updated';

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
