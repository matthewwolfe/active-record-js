export default class HasTimestamps
{
    public timestamps: boolean = true;

    public CREATED_AT: string;
    public UPDATED_AT: string;

    public setCreatedAt(timestamp): void
    {
        this[this.CREATED_AT] = timestamp;
    }

    public setUpdatedAt(timestamp): void
    {
        this[this.UPDATED_AT] = timestamp;
    }
}
