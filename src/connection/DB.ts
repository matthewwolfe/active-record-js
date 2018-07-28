import ConnectionOptions from './ConnectionOptions';
import Database from './Database';
import { Logger } from '../libraries/Logger';


export default class DB
{
    private static active: string;
    private static databases: Map<String, Database> = new Map();
    private static isQueryLogEnabled: boolean = false;
    private static logger: Logger = new Logger();

    public static async beginTransaction(): Promise<any>
    {
        return await this.run('START TRANSACTION');
    }

    public static async commit(): Promise<any>
    {
        return await this.run('COMMIT');
    }

    public static create(options: ConnectionOptions): void
    {
        const db = new Database(options);

        this.active = options.name;
        this.databases.set(options.name, db);
    }

    public static enableQueryLog(): void
    {
        this.isQueryLogEnabled = true;
    }

    public static getActiveDatabase(): Database
    {
        return this.databases.get(this.active);
    }

    public static getQueryLog(): Array<any>
    {
        return this.logger.getLogs();
    }

    public static async run(query): Promise<any>
    {
        if (this.isQueryLogEnabled) {
            this.logger.log(query);
        }

        return await this.getActiveDatabase().run(query);
    }

    public static async rollBack(): Promise<any>
    {
        return await this.run('ROLLBACK');
    }

    public static setActiveDatabase(name: string): Database
    {
        return this.databases.get(name);
    }
}
