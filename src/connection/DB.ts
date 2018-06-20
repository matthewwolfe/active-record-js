import Database from './Database';


export default class DB
{
    private static active: string;
    private static databases: Map<String, Database> = new Map();

    public static create(host: string, user: string, password: string, database: string, name: string = ''): void
    {
        const db = new Database(host, user, password, database, name);

        this.active = name;
        this.databases.set(name, db);
    }

    public static getActiveDatabase(): Database
    {
        return this.databases.get(this.active);
    }

    public static async run(query): Promise<any>
    {
        return await this.getActiveDatabase().run(query);
    }

    public static setActiveDatabase(name: string)
    {
        return this.databases.get(name);
    }
}
