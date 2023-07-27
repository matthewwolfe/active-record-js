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

    test('from', () =>
    {
        const query = new Builder().from('users');
        expect(query.fromTable).toEqual('users');
    });

    test('groupBy', () =>
    {
        const query = new Builder().from('users');
        query.groupBy(['roleId', 'accountId']);
        expect(query.groups).toEqual(['roleId', 'accountId']);
    });

    test('join', () =>
    {
        const query = new Builder().from('users');
        query.join('comments', 'users.id', '=', 'comments.userId');
        expect(query.joins.length).toEqual(1);
    });

    test('leftJoin', () =>
    {
        const query = new Builder().from('users');
        query.leftJoin('comments', 'users.id', '=', 'comments.userId');
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

    test('orderBy', () =>
    {
        const query = new Builder().from('users');
        query.orderBy('lastName', 'desc');
        expect(query.orders.length).toEqual(1);
    });

    test('rightJoin', () =>
    {
        const query = new Builder().from('users');
        query.rightJoin('comments', 'users.id', '=', 'comments.userId');
        expect(query.joins.length).toEqual(1);
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
        expect(query.toSql()).toEqual("SELECT `users`.* FROM `users`");
    });

    test('where', () =>
    {
        const query = new Builder().from('users');
        query.where('id', '=', 1);
        expect(query.wheres.length).toEqual(1);
    });

    test('whereIn', () =>
    {
        const query = new Builder().from('users');
        query.whereIn('id', [1, 2, 3]);
        expect(query.wheres.length).toEqual(1);
    });
});
