import Where from 'query/expressions/Where';


describe('Where', () =>
{
    test('where - toString', () =>
    {
        const where = new Where('id', '=', 5);
        expect(where.toString()).toEqual('`id` = 5');
    });

    test('whereIn - toString', () =>
    {
        const where = new Where('id', 'in', [1, 2, 3, 4]);
        expect(where.toString()).toEqual('`id` IN (1, 2, 3, 4)');
    });
});
