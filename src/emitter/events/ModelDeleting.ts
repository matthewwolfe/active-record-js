import Event from './Event';


export default class ModelDeleting extends Event
{
    public model: any;
    public type: string = 'model-deleting';

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
