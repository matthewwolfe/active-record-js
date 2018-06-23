import { model } from 'model/decorators';
import Model from 'model/Model';
import HasMany from 'query/relations/HasMany';


describe('HasMany', () =>
{
    @model
    class User extends Model
    {
        public static table = 'users';
    }

    @model
    class Comment extends Model
    {
        public static table = 'comments';
    }

    const user = new User({id: 1});

    test('buildQuery', () =>
    {
        const hasMany = new HasMany(user, 'Comment', 'userId');
        expect(hasMany.buildQuery().toSql()).toEqual(
            "SELECT `comments`.`*` FROM `comments` WHERE `comments`.`userId` = 1"
        );
    });
});
