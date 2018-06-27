import Event from './Event';


export default class ModelUpdating extends Event
{
    public type: string = 'model-updating';

    public getMessage()
    {
        return this.type;
    }
}
