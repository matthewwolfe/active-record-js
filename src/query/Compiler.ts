/**
 * Compiles a query builder instance into a string ready for execution
 */
export default class Compiler
{
    public query;

    constructor(query)
    {
        this.query = query;
    }

    public compileSelect(): string
    {
        let sql = '';
        return sql;
    }
}
