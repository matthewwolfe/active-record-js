import * as mysql from 'mysql';

/**
 * Compiles a query builder instance into a string ready for execution
 */
export default class Compiler
{
    public compileInsert(query, attributes)
    {
        const expressions = [];

        expressions.push('INSERT INTO');
        expressions.push(mysql.escapeId(query.fromTable));

        const columns = [];
        const values = [];

        for (const key in attributes) {
            columns.push(mysql.escapeId(key));
            values.push(mysql.escape(attributes[key]));
        }

        expressions.push('(', columns.join(', '), ')');
        expressions.push('VALUES');
        expressions.push('(', values.join(', '), ')');

        return expressions.join(' ').trim();
    }

    public compileSelect(query)
    {
        const expressions = [];

        expressions.push('SELECT');

        if (query.isDistinct) {
            expressions.push('DISTINCT');
        }

        expressions.push(query.selects.map(select => mysql.escapeId(select)).join(', '));
        expressions.push(`FROM ${mysql.escapeId(query.fromTable)}`);

        if (query.joins.length > 0) {
            expressions.push(query.joins);
        }

        if (query.wheres.length > 0) {
            expressions.push('WHERE', query.wheres.join(' AND '));
        }

        if (query.groups.length > 0) {
            expressions.push('GROUP BY', query.groups.join(', '));
        }

        if (query.orders.length > 0) {
            expressions.push('ORDER BY', query.orders.join(', '));
        }

        if (query.limits) {
            expressions.push('LIMIT', query.limits);
        }

        if (query.offsets) {
            expressions.push('OFFSET', query.offsets);
        }

        return expressions.join(' ').trim();
    }
}
