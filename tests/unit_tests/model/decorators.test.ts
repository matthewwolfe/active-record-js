jest.mock('mysql2', () => require(`${process.cwd()}/tests/mocks/mysql`));

import DB from 'connection/DB';
import { model, relation } from 'model/decorators';
import Model from 'model/Model';
import models from 'model/stores/models';
import relations from 'model/stores/relations';


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

describe('Model decorators', () =>
{
    @model
    class User extends Model
    {
        public static table = 'users';

        @relation
        setting()
        {
            return this.hasOne('Setting', 'userId');
        }

        @relation
        comments()
        {
            return this.hasMany('Comment', 'userId');
        }

        @relation
        client()
        {
            return this.belongsTo('Client', 'clientId');
        }

        @relation
        roles()
        {
            return this.belongsToMany('Role', 'userRoles', 'userId', 'roleId');
        }
    }

    // Add related models so that the tests work
    @model
    class Setting extends Model
    {
        public static table = 'settings';
    }

    @model
    class Comment extends Model
    {
        public static table = 'comments';
    }

    @model
    class Client extends Model
    {
        public static table = 'clients';
    }

    @model
    class Role extends Model
    {
        public static table = 'roles';
    }

    test('register a model to the store', () =>
    {
        expect(models.getModel('User')).toEqual(User);
    });

    test('relation - hasOne', async () =>
    {
        const user = new User({id: 1});
        expect(user.setting().constructor.name).toEqual('Builder');
        expect(relations.isRelation('User', 'setting')).toEqual(true);

        require('mysql2').setMockResults([
            {id: 1, userId: 1, type: 'setting-type'},
        ]);

        const setting = await user.$setting;
        expect(setting.constructor.name).toEqual('Setting');
        expect(setting.id).toEqual(1);
        expect(setting.type).toEqual('setting-type');
    });

    test('relation - hasMany', async () =>
    {
        const user = new User({id: 1});
        expect(user.comments().constructor.name).toEqual('Builder');
        expect(relations.isRelation('User', 'comments')).toEqual(true);

        require('mysql2').setMockResults([
            {id: 1, userId: 1, message: 'comment 1'},
            {id: 2, userId: 1, message: 'comment 2'},
            {id: 3, userId: 1, message: 'comment 3'},
        ]);

        const comments = await user.$comments;
        expect(comments.length).toEqual(3);
        expect(comments[0].constructor.name).toEqual('Comment');
    });

    test('relation - belongsTo', async () =>
    {
        const user = new User({id: 1, clientId: 1});
        expect(user.client().constructor.name).toEqual('Builder');
        expect(relations.isRelation('User', 'client')).toEqual(true);

        require('mysql2').setMockResults([
            {id: 1, name: 'Client 1'}
        ]);

        const client = await user.$client;
        expect(client.constructor.name).toEqual('Client');
        expect(client.id).toEqual(1);
    });

    test('relation - belongsToMany', async () =>
    {
        const user = new User({id: 1});
        expect(user.roles().constructor.name).toEqual('Builder');
        expect(relations.isRelation('User', 'roles')).toEqual(true);

        require('mysql2').setMockResults([
            {id: 1, name: 'Role 1'}
        ]);

        const roles = await user.$roles;
        expect(roles.length).toEqual(1);
        expect(roles[0].constructor.name).toEqual('Role');
    })
});
