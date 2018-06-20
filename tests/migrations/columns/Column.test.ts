import Column from 'migrations/columns/Column';
import { ColumnType } from 'migrations/constants';


describe('Column', () =>
{
    test('basic', () =>
    {
        const column = new Column('id', ColumnType.INTEGER);
        expect(column.toString()).toEqual("`id` INT NULL");
    });

    test('disallow null', () =>
    {
        const column = new Column('id', ColumnType.INTEGER, {allowNull: false});
        expect(column.toString()).toEqual("`id` INT NOT NULL");
    });

    test('default', () =>
    {
        const column = new Column('id', ColumnType.INTEGER, {default: 0});
        expect(column.toString()).toEqual("`id` INT NULL DEFAULT 0");
    });

    test('length', () =>
    {
        const column = new Column('id', ColumnType.INTEGER, {default: 0, length: 15});
        expect(column.toString()).toEqual("`id` INT (15) NULL DEFAULT 0");
    });
});
