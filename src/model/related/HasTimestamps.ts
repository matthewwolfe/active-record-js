export default class HasTimestamps
{
    public timestamps: boolean = true;

    public CREATED_AT: string;
    public UPDATED_AT: string;

    public setCreatedAt(timestamp)
    {
        this[this.CREATED_AT] = timestamp;
        return this;
    }

    public setUpdatedAt(timestamp)
    {
        this[this.UPDATED_AT] = timestamp;
        return this;
    }
}
