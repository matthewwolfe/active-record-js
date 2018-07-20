import DB from 'connection/DB';
import Schema from 'migrations/Schema';


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

    await DB.beginTransaction();
});

afterEach(async () =>
{
    await Schema.dropIfExists('users');
    await DB.rollBack();
});

describe('Schema', () =>
{
    test('createTable', async () =>
    {
        await Schema.createTable('users', (blueprint) =>
        {
            blueprint.integer('id', {allowNull: false, length: 15, signed: false});
            blueprint.varchar('firstName', {length: 255});
        });

        expect(await Schema.hasTable('users')).toEqual(true);
        expect(await Schema.hasColumn('users', 'id')).toEqual(true);
        expect(await Schema.hasColumn('users', 'firstName')).toEqual(true);
    });

    test('drop', async () =>
    {
        await Schema.createTable('users', (blueprint) =>
        {
            blueprint.integer('id', {allowNull: false, length: 15, signed: false});
            blueprint.varchar('firstName', {length: 255});
        });

        expect(await Schema.hasTable('users')).toEqual(true);

        await Schema.drop('users');
        expect(await Schema.hasTable('users')).toEqual(false);
    });
});
