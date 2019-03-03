import { model } from 'model/decorators';
import Model from 'model/Model';
import BelongsToMany from 'query/relations/BelongsToMany';


describe('BelongsToMany', () =>
{
    @model
    class User extends Model
    {
        public static table = 'users';
    }

    @model
    class Role extends Model
    {
        public static table = 'roles';
    }

    const role = new Role({id: 1, name: 'test role'});

    test('buildQuery', () =>
    {
        const belongsToMany = new BelongsToMany(role, 'User', 'userRoles', 'roleId', 'userId');

        expect(belongsToMany.buildQuery().toSql()).toEqual(
            "SELECT `users`.`*` FROM `users` JOIN `userRoles` ON `userRoles`.`userId` = `users`.`id` WHERE `userRoles`.`roleId` = 1"
        );
    });
});
