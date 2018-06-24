import * as mysql from 'mysql';
import Blueprint from './Blueprint';
import { DB } from 'connection';


export default class Schema
{
    public static async createTable(table: string, fn: Function)
    {
        const blueprint = new Blueprint(table);
        fn(blueprint);

        return await this.run(blueprint.compile());
    }

    public static async drop(table: string): Promise<boolean>
    {
        return await this.run(`DROP TABLE ${mysql.escapeId(table)}`);
    }

    public static async dropIfExists(table: string): Promise<boolean>
    {
        return await this.run(`DROP TABLE IF EXISTS ${mysql.escapeId(table)}`);
    }

    public static async hasTable(table: string): Promise<boolean>
    {
        const results = await DB.run(`SHOW TABLES LIKE ${mysql.escape(table)}`);
        return results.length !== 0;
    }

    private static async run(query)
    {
        try {
            await DB.run(query);
        }
        catch (error) {
            return false;
        }

        return true;
    }
}
