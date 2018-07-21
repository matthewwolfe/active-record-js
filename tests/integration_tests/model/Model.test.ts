import DB from 'connection/DB';
import Schema from 'migrations/Schema';
import { model, relation } from 'model/decorators';
import Model from 'model/Model';
import Builder from 'query/Builder';


@model
class User extends Model
{
    public static table = 'users';
}

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
        {id: 1, firstName: 'test1'},
        {id: 2, firstName: 'test2'}
    ]);
});

afterEach(async () =>
{
    await Schema.dropIfExists('users');
    await DB.rollBack();
});

describe('Model', () =>
{
    test('all', async () =>
    {
        const users = await User.all();
        expect(users.length).toEqual(2);

        expect(users[0].id).toEqual(1);
        expect(users[1].id).toEqual(2);
    });

    test('findById', async () =>
    {
        const id = 1;
        const user = await User.findById(id);
        expect(user.id).toEqual(id);
        expect(user.firstName).toEqual('test1');
    });

    test('select', async () =>
    {
        const users = await User.select(['id']).orderBy('id', 'asc').get();
        expect(users.length).toEqual(2);
        expect(users[0].id).toEqual(1);
        expect(users[1].id).toEqual(2);
    });

    test('where', async () =>
    {
        const id = 1;
        const user = await User.where('id', '=', id).first();
        expect(user.id).toEqual(id);
    });

    test('whereIn', async () =>
    {
        const users = await User.whereIn('id', [1, 2]).get();
        expect(users.length).toEqual(2);
    });
});
