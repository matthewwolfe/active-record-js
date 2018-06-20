import IntegerColumn from 'migrations/columns/IntegerColumn';
import { ColumnType } from 'migrations/constants';


describe('IntegerColumn', () =>
{
    test('basic', () =>
    {
        const column = new IntegerColumn('id', ColumnType.INTEGER);
        expect(column.toString()).toEqual("`id` INT SIGNED NULL");
    });

    test('autoIncrement', () =>
    {
        const column = new IntegerColumn('id', ColumnType.INTEGER, {autoIncrement: true, signed: false});
        expect(column.toString()).toEqual("`id` INT UNSIGNED NULL AUTO_INCREMENT");
    })
})
