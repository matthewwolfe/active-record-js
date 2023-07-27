import md5 from 'md5';
import * as mysql from 'mysql2';
import ConnectionOptions from './ConnectionOptions';


export default class Database
{
    private pool: mysql.Pool;

    private database: string;
    private host: string;
    private name: string;
    private password: string;
    private port: number;
    private user: string;

    constructor(options: ConnectionOptions)
    {
        this.database = options.database;
        this.host = options.host;
        this.name = options.name;
        this.password = options.password;
        this.port = options.port;
        this.user = options.user;


        this.pool = mysql.createPool({
            database: this.database,
            host: this.host,
            password: this.password,
            port: this.port,
            user: this.user
        });
    }

    public getName(): string
    {
        return this.name;
    }

    public md5(): string
    {
        return md5(this.host + this.user + this.password + this.database);
    }

    public async run(query: string): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((error, connection) => {
                if (error) {
                    if(connection) {
                        connection.destroy();
                    }

                    reject(error);
                }

                connection.query(query, (error, results) => {
                    connection.destroy();

                    if (error) {
                        reject(error);
                    }

                    resolve(results);
                })
            });
        })
    }
}
