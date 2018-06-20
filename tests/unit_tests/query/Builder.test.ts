import Builder from 'query/Builder';


describe('Builder', () =>
{
    test('distinct', () =>
    {
        const query = new Builder('users');
        expect(query.isDistinct).toEqual(false);

        query.distinct();
        expect(query.isDistinct).toEqual(true);
    });

    test('limit', () =>
    {
        const query = new Builder('users');
        query.limit(10);
        expect(query.limits).toEqual(10);
    });

    test('offset', () =>
    {
        const query = new Builder('users');
        query.offset(10);
        expect(query.offsets).toEqual(10);
    });

    test('select "from".* by default', () =>
    {
        const query = new Builder('users');
        expect(query.selects.length).toEqual(1);
        expect(query.selects[0]).toEqual('users.*');
    });

    test('toSql', () =>
    {
        const query = new Builder('users');
        expect(query.toSql()).toEqual("SELECT `users`.`*` FROM `users`");
    });
});
