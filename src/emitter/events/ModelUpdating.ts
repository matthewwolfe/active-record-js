import Event from './Event';


export default class ModelUpdating extends Event
{
    public model: any;
    public type: string = 'model-updating';

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
