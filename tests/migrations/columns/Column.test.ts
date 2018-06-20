import 'mocha';
import { expect } from 'chai';
import Column from 'migrations/columns/Column';
import { ColumnType } from 'migrations/constants';


describe('Column', () =>
{
    it('basic', () =>
    {
        const column = new Column('id', ColumnType.INTEGER);
        expect(column.toString()).to.equal("`id` INT NULL");
    });

    it('disallow null', () =>
    {
        const column = new Column('id', ColumnType.INTEGER, {allowNull: false});
        expect(column.toString()).to.equal("`id` INT NOT NULL");
    });

    it('default', () =>
    {
        const column = new Column('id', ColumnType.INTEGER, {default: 0});
        expect(column.toString()).to.equal("`id` INT NULL DEFAULT 0");
    });

    it('length', () =>
    {
        const column = new Column('id', ColumnType.INTEGER, {default: 0, length: 15});
        expect(column.toString()).to.equal("`id` INT (15) NULL DEFAULT 0");
    });
});
