import { model } from 'model/decorators';
import Model from 'model/Model';
import HasOne from 'query/relations/HasOne';


describe('HasOne', () =>
{
    @model
    class User extends Model
    {
        public static table = 'users';
    }

    @model
    class Account extends Model
    {
        public static table = 'accounts';
    }

    const user = new User({id: 1});

    test('buildQuery', () =>
    {
        const hasOne = new HasOne(user, 'Account', 'userId');
        expect(hasOne.buildQuery().toSql()).toEqual(
            "SELECT `accounts`.* FROM `accounts` WHERE `accounts`.`userId` = 1 LIMIT 1"
        );
    });
});
