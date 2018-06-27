import Event from './Event';


export default class ModelDeleted extends Event
{
    public type: string = 'model-deleted';

    public getMessage()
    {
        return this.type;
    }
}
