import 'mocha';
import { expect } from 'chai';
import { model } from 'model/decorators';
import Model from 'model/Model';


describe('Model', () =>
{
    it('create a select query', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const query = User.select(['id']);

        expect(query.selects.length).to.equal(1);
        expect(query.selects[0]).to.equal('id');
        expect(query.from).to.equal(User.table);
    });
})
