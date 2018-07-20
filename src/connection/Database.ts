import md5 from 'md5';
import * as mysql from 'mysql';
import ConnectionOptions from './ConnectionOptions';


export default class Database
{
    private pool;

    private database: string;
    private host: string;
    private name: string;
    private password: string;
    private port: number;
    private user: string;

    constructor(options: ConnectionOptions)
    {
        this.host = options.host;
        this.user = options.user;
        this.password = options.password;
        this.port = options.port;
        this.database = options.database;
        this.name = options.name;

        this.pool = mysql.createPool({
            host: this.host,
            user: this.user,
            password: this.password,
            port: this.port,
            database: this.database
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
                    connection.destroy();
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
