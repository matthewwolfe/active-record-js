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
        await query.insert({id: 1, firstName: 'test'});

        expect(await query.count()).toEqual(1);
    });

    test('distinct', async () =>
    {
        const query = new Builder().from('users');
        await query.insert({id: 1, firstName: 'test'});

        const selectQuery = new Builder().from('users');
        const users = await selectQuery.get();

        expect(users.length).toEqual(1);
    });
});
