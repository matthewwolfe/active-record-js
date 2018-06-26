export default abstract class Event
{
    public type: string;
    public abstract getMessage(): any;
}
