import Emitter from '../Emitter';


export default abstract class Event
{
    public type: string;
    public abstract getMessage(): any;

    public fire(): void
    {
        Emitter.emit(this);
    }
}
