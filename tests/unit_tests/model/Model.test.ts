jest.mock('mysql', () => require(`${process.cwd()}/tests/mocks/mysql`));

import DB from 'connection/DB';
import { model } from 'model/decorators';
import Model from 'model/Model';


beforeEach(() =>
{
    DB.create('127.0.0.1', 'user', 'password', 'TEST_DB', 'test-database');
});

describe('Model', () =>
{
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
        }

        const user = await User.findById(1);

        expect(user instanceof User).toEqual(true);
        expect(user.id).toEqual(1);
        expect(user.firstName).toEqual('test');
        expect(user.lastName).toEqual('user');

        console.log();
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
    });
});
