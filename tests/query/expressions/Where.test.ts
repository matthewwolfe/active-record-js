import 'mocha';
import { expect } from 'chai';
import Where from 'query/expressions/Where';


describe('Where', () =>
{
    it('where - toString', () =>
    {
        const where = new Where('id', '=', 5);
        expect(where.toString()).to.equal('`id` = 5');
    });

    it('whereIn - toString', () =>
    {
        const where = new Where('id', 'in', [1, 2, 3, 4]);
        expect(where.toString()).to.equal('`id` IN (1, 2, 3, 4)');
    });
});
