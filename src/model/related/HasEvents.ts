import { EventEmitter } from 'events';
import { ModelEvent } from 'model/constants';


export default class HasEvents
{
    // TODO: Make this call a global event emitter, so that there is only one instance
    public emitter: EventEmitter = new EventEmitter();

    public fireEvent(event: ModelEvent)
    {
        this.emitter.emit(event.toString());
    }

    public addListener(event: ModelEvent, fn: (...args: any[]) => any)
    {
        this.emitter.addListener(event, fn);
    }
}
