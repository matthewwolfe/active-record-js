import Database from './Database';


export default class DB
{
    private static activeId: string;
    private static databases: Map<String, Database> = new Map();

    public static create(host: string, user: string, password: string, database: string, name: string = ''): void
    {
        const db = new Database(host, user, password, database, name);
        const id = db.md5();

        this.activeId = id;
        this.databases.set(id, db);
    }

    public static getActiveDatabase(): Database
    {
        return this.databases.get(this.activeId);
    }

    public static async run(query): Promise<any>
    {
        return await this.getActiveDatabase().run(query);
    }
}
