import md5 from 'md5';
import * as mysql from 'mysql';


export default class Database
{
    private pool;
    private host: string;
    private user: string;
    private password: string;
    private database: string;
    private name: string;

    constructor(host: string, user: string, password: string, database: string, name: string = '')
    {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.name = name;

        this.pool = mysql.createPool({
            host: this.host,
            user: this.user,
            password: this.password,
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

    public async run(query: string)
    {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((error, connection) => {
                if (error) {
                    connection.release();
                    reject(error);
                }

                connection.query(query, (error, results) => {
                    connection.release();

                    if (error) {
                        reject(error);
                    }

                    resolve(results);
                })
            });
        })
    }
}
