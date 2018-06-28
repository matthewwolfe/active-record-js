export class Logger
{
    private logs: Array<any> = [];

    public clear()
    {
        this.logs = [];
    }

    public getLogs(): Array<any>
    {
        return this.logs;
    }

    public log(log: object)
    {
        this.logs.push(log);
    }
}
