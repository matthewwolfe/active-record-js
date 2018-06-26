import { EventEmitter } from 'events';


class Emitter
{
    private static emitter: EventEmitter = new EventEmitter();

    public static addListener(event: any, fn: (...args: any[]) => any)
    {
        this.emitter.addListener(event, fn);
    }

    public static emit(event: any)
    {
        this.emitter.emit(event.type, event.getMessage());
    }
}

export default Emitter;
