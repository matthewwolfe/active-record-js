import * as mysql from 'mysql2';

/**
 * Compiles a query builder instance into a string ready for execution
 */
export default class Compiler
{
    public compileDelete(query): string
    {
        const expressions = [];

        expressions.push('DELETE FROM');
        expressions.push(mysql.escapeId(query.fromTable));

        if (query.wheres.length > 0) {
            expressions.push(this.compileWheres(query.wheres));
        }

        return expressions.join(' ').trim();
    }

    public compileInsert(query, rows): string
    {
        const expressions = [];

        expressions.push('INSERT INTO');
        expressions.push(mysql.escapeId(query.fromTable));

        const columns = Object.keys(rows[0]).map(key => mysql.escapeId(key));
        const values = [];

        rows.forEach((row) => {
            const value = [];

            for (const key in row) {
                value.push(mysql.escape(row[key]));
            }

            values.push(value);
        });

        expressions.push('(', columns.join(', '), ')');
        expressions.push('VALUES');
        expressions.push(values.map(value => `( ${value.join(', ')} )`).join(', '));

        return expressions.join(' ').trim();
    }

    public compileSelect(query, count: boolean = false): string
    {
        const expressions = [];

        expressions.push('SELECT');

        if (query.isDistinct) {
            expressions.push('DISTINCT');
        }

        if (count) {
            expressions.push('COUNT(*) as count');
        }
        else if (query.selects.length > 0) {
            expressions.push(query.selects.map(select => select.match(/\.\*/) ? [mysql.escapeId(select.split('.')[0]), '*'].join('.') : mysql.escapeId(select)).join(', '));
        }

        expressions.push(`FROM ${mysql.escapeId(query.fromTable)}`);

        if (query.joins.length > 0) {
            expressions.push(query.joins);
        }

        if (query.wheres.length > 0) {
            expressions.push(this.compileWheres(query.wheres));
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

    public compileUpdate(query, updates: object): string
    {
        const expressions = ['UPDATE', mysql.escapeId(query.fromTable), 'SET'];

        if (updates) {
            expressions.push(
                Object.keys(updates).map(column =>
                    `${mysql.escapeId(column)} = ${mysql.escape(updates[column])}`
                ).join(', ')
            );
        }

        if (query.wheres.length > 0) {
            expressions.push(this.compileWheres(query.wheres));
        }

        return expressions.join(' ').trim();
    }

    private compileWheres(wheres): string
    {
        const expressions = ['WHERE'];

        wheres.forEach((where, index) => {
            if (index !== 0) {
                expressions.push(where.condition);
            }

            expressions.push(where.toString());
        });

        return expressions.join(' ');
    }
}
