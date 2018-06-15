import * as mysql from 'mysql';

/**
 * Compiles a query builder instance into a string ready for execution
 */
export default class Compiler
{
    public compileSelect(query)
    {
        const expressions = [];

        expressions.push('SELECT');

        if (query.isDistinct) {
            expressions.push('DISTINCT');
        }

        expressions.push(query.selects.map(select => mysql.escapeId(select)).join(', '));
        expressions.push(`FROM ${mysql.escapeId(query.from)}`);

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
