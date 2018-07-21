import DB from 'connection/DB';
import Schema from 'migrations/Schema';
import { model, relation } from 'model/decorators';
import Model from 'model/Model';
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

describe('Model', () =>
{
    test('all', () =>
    {

    });
});
