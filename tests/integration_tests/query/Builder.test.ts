import DB from 'connection/DB';
import Schema from 'migrations/Schema';
import Builder from 'query/Builder';


beforeEach(async () =>
{
    DB.create({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        port: 3333,
        database: 'tests',
        name: 'test-database'
    });

    await Schema.createTable('users', (blueprint) =>
    {
        blueprint.integer('id', {allowNull: false, length: 15, signed: false});
        blueprint.varchar('firstName', {length: 255});
    });

    await DB.beginTransaction();

    const query = new Builder().from('users');
    await query.insertMany([
        {id: 1, firstName: 'test'},
        {id: 2, firstName: 'test'}
    ]);
});

afterEach(async () =>
{
    await Schema.dropIfExists('users');
    await DB.rollBack();
});


describe('Builder', () =>
{
    test('count', async () =>
    {
        const query = new Builder().from('users');
        const count = await query.count();
        expect(count).toEqual(2);
    });

    test('delete', async () =>
    {
        await new Builder().from('users').delete({id: 1});
        const count = await new Builder().from('users').count();
        expect(count).toEqual(1);
    });

    test('distinct', async () =>
    {
        const selectQuery = new Builder().from('users').select(['firstName']).distinct();
        const users = await selectQuery.get();
        expect(users.length).toEqual(1);
    });

    test('first', async () =>
    {
        const query = new Builder().from('users');
        const user = await query.where('firstName', '=', 'test').orderBy('id', 'asc').first();
        expect(user.id).toEqual(1);
    });

    test('insert', async () =>
    {
        const query = new Builder().from('users');
        await query.insert({id: 3, firstName: 'test'});

        const count = await new Builder().from('users').count();
        expect(count).toEqual(3);
    });

    test('limit', async () =>
    {
        const query = new Builder().from('users');
        const users = await query.limit(1).get();
        expect(users.length).toEqual(1);
    });

    test('offset', async () =>
    {
        const query = new Builder().from('users').orderBy('id', 'asc').offset(1);
        const user = await query.first();
        expect(user.id).toEqual(2);
    });

    test('update', async () =>
    {
        const query = new Builder().from('users').where('id', '=', 1);
        await query.update({firstName: 'testing'});

        const selectQuery = new Builder().from('users');
        const user = await selectQuery.where('id', '=', 1).first();
        expect(user.firstName).toEqual('testing');
    });

    test('where', async () =>
    {
        const query = new Builder().from('users').where('id', '=', 1).where('firstName', '=', 'test');
        const count = await query.count();
        expect(count).toEqual(1);
    });

    test('whereIn', async () =>
    {
        const query = new Builder().from('users').whereIn('id', [1, 2]);
        const users = await query.get();
        expect(users.length).toEqual(2);
    });
});
