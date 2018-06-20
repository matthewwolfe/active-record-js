import 'mocha';
import { expect } from 'chai';
import IntegerColumn from 'migrations/columns/IntegerColumn';
import { ColumnType } from 'migrations/constants';


describe('IntegerColumn', () =>
{
    it('basic', () =>
    {
        const column = new IntegerColumn('id', ColumnType.INTEGER);
        expect(column.toString()).to.equal("`id` INT SIGNED NULL");
    });

    it('autoIncrement', () =>
    {
        const column = new IntegerColumn('id', ColumnType.INTEGER, {autoIncrement: true, signed: false});
        expect(column.toString()).to.equal("`id` INT UNSIGNED NULL AUTO_INCREMENT");
    })
})
