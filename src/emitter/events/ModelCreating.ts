import Event from './Event';


export default class ModelCreating extends Event
{
    public model: any;
    public type: string = 'model-creating';

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
