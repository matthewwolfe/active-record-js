import { model } from 'model/decorators';
import Model from 'model/Model';
import BelongsTo from 'query/relations/BelongsTo';


describe('BelongsTo', () =>
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

    const account = new Account({id: 1, userId: 2});

    test('buildQuery', () =>
    {
        const belongsTo = new BelongsTo(account, 'User', 'userId');

        expect(belongsTo.buildQuery().toSql()).toEqual(
            "SELECT `users`.* FROM `users` WHERE `users`.`id` = 2 LIMIT 1"
        );
    });
});
