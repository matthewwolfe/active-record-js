import { model, relation } from 'model/decorators';
import Model from 'model/Model';
import models from 'model/stores/models';
import relations from 'model/stores/relations';


describe('Model decorators', () =>
{
    test('register a model to the store', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        expect(models.getModel('User')).toEqual(User);
    });

    test('register a relation to the store', () =>
    {
        // Add related models so that the tests work
        @model
        class Setting extends Model {}

        @model
        class Comment extends Model {}

        @model
        class Client extends Model {}

        @model
        class Role extends Model {}

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

        const user = new User({id: 1});

        expect(user.setting().constructor.name).toEqual('Builder');
        expect(relations.isRelation('User', 'setting')).toEqual(true);

        expect(user.comments().constructor.name).toEqual('Builder');
        expect(relations.isRelation('User', 'comments')).toEqual(true);

        expect(user.client().constructor.name).toEqual('Builder');
        expect(relations.isRelation('User', 'client')).toEqual(true);

        expect(user.roles().constructor.name).toEqual('Builder');
        expect(relations.isRelation('User', 'roles')).toEqual(true);
    });
});
