import Builder from 'query/Builder';


describe('Builder', () =>
{
    test('distinct', () =>
    {
        const query = new Builder().from('users');
        expect(query.isDistinct).toEqual(false);

        query.distinct();
        expect(query.isDistinct).toEqual(true);
    });

    test('join', () =>
    {
        const query = new Builder().from('users');
        query.join('comments', 'users.id', '=', 'comments.userId');
        expect(query.joins.length).toEqual(1);
    });

    test('limit', () =>
    {
        const query = new Builder().from('users');
        query.limit(10);
        expect(query.limits).toEqual(10);
    });

    test('offset', () =>
    {
        const query = new Builder().from('users');
        query.offset(10);
        expect(query.offsets).toEqual(10);
    });

    test('select "from".* by default', () =>
    {
        const query = new Builder().from('users');
        expect(query.selects.length).toEqual(1);
        expect(query.selects[0]).toEqual('users.*');
    });

    test('toSql', () =>
    {
        const query = new Builder().from('users');
        expect(query.toSql()).toEqual("SELECT `users`.`*` FROM `users`");
    });
});
