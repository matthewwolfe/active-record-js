import * as mysql from 'mysql';


export default class Database
{
    private pool;

    constructor(host: string, user: string, password: string, database: string) {
        this.pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database
        });
    }

    public async run(query: string) {
        return new Promise((resolve) => {
            this.pool.getConnection((error, connection) => {
                if (error) {
                    throw error;
                }

                connection.query(query, (error, results, fields) => {
                    connection.release();

                    if (error) {
                        throw error;
                    }

                    resolve({results, fields});
                })
            });
        })
    }
}
