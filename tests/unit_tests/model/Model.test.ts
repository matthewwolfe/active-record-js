jest.mock('mysql', () => require(`${process.cwd()}/tests/mocks/mysql`));

import DB from 'connection/DB';
import { model } from 'model/decorators';
import Model from 'model/Model';


beforeEach(() =>
{
    DB.create({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        port: 3306,
        database: 'TEST_DB',
        name: 'test-database'
    });
});

describe('Model', () =>
{
    test('casts', async () =>
    {
        require('mysql').setMockResults([
            {id: 1, firstName: 'test', lastName: 'user', active: 1}
        ]);


        @model
        class User extends Model
        {
            public static casts = {
                active: 'boolean'
            };
            public static table = 'users';
        }

        const user = await User.findById(1);
        expect(user.active).toEqual(true);
    });

    test('create a select query', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const query = User.select(['id']);

        expect(query.selects.length).toEqual(1);
        expect(query.selects[0]).toEqual('id');
        expect(query.fromTable).toEqual(User.table);
    });

    test('findById', async () =>
    {
        require('mysql').setMockResults([
            {id: 1, firstName: 'test', lastName: 'user'}
        ]);

        @model
        class User extends Model
        {
            public static table = 'users';

            public fullNameAttribute(attributes): string
            {
                return `${attributes.firstName} ${attributes.lastName}`;
            }
        }

        const user = await User.findById(1);

        expect(user instanceof User).toEqual(true);
        expect(user.changedAttributes.length).toEqual(0);
        expect(user.id).toEqual(1);
        expect(user.firstName).toEqual('test');
        expect(user.lastName).toEqual('user');
        expect(user.fullName).toEqual('test user');
    });

    test('get an attribute', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const user = new User({id: 1});
        expect(user.id).toEqual(1);
        expect(user.changedAttributes.length).toEqual(1);
    });

    test('get an accessor', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';

            public fullNameAttribute(attributes): string
            {
                return `${attributes.firstName} ${attributes.lastName}`;
            }
        }

        const user = new User({
            firstName: 'test',
            lastName: 'user'
        });

        expect(user.fullName).toEqual(`${user.firstName} ${user.lastName}`);
        expect(user.changedAttributes.length).toEqual(2);
    });

    test('get an attribute with a mutator', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';

            public firstNameAttribute(attributes): string
            {
                return attributes.firstName.toUpperCase();
            }
        }

        const user = new User({
            firstName: 'test',
            lastName: 'user'
        });

        expect(user.firstName).toEqual('TEST');

        user.firstName = 'new name';
        expect(user.firstName).toEqual('NEW NAME');
        expect(user.changedAttributes.length).toEqual(2);
    });

    test('set an attribute', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const user = new User();
        user.id = 1;

        expect(user.id).toEqual(1);
        expect(user.changedAttributes.length).toEqual(1);
    });

    test('get dirty attributes', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const user = new User();
        user.id = 1;
        user.firstName = 'test';
        user.lastName = 'user';

        expect(user.changedAttributes.length).toEqual(3);
        expect(user.getDirtyAttributes()).toEqual({
            id: 1,
            firstName: 'test',
            lastName: 'user'
        });
    });

    test('toJSON with hidden attributes', () =>
    {
        @model
        class User extends Model
        {
            public static hidden = ['password'];
            public static table = 'users';
        }

        const user = new User({
            id: 1,
            firstName: 'test',
            lastName: 'user',
            password: 'password'
        });

        expect(JSON.stringify(user)).toEqual("{\"id\":1,\"firstName\":\"test\",\"lastName\":\"user\"}");
    })

    test('update', async () =>
    {
        require('mysql').setMockResults([
            {id: 1, firstName: 'test', lastName: 'user'}
        ]);

        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const user = new User();

        user.id = 1;
        user.firstName = 'test';
        user.lastName = 'user';
        const success = await user.save();

        expect(success).toEqual(true);
    });

    test('where', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const query = User.where('id', '=', 1);
        expect(query.toSql()).toEqual("SELECT `users`.`*` FROM `users` WHERE `id` = 1");
    });

    test('whereIn', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const query = User.whereIn('id', [1, 2, 3]);
        expect(query.toSql()).toEqual("SELECT `users`.`*` FROM `users` WHERE `id` IN (1, 2, 3)");
    });
});
