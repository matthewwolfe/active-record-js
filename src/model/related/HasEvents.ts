import { EventEmitter } from 'events';
import { ModelEvent } from 'model/constants';


export default class HasEvents
{
    public emitter: EventEmitter = new EventEmitter();

    public fireEvent(event: ModelEvent)
    {
        this.emitter.emit(event.toString());
    }
}
