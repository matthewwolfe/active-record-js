import Event from './Event';


export default class ModelCreated extends Event
{
    public model: any;
    public type: string = 'model-created';

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
