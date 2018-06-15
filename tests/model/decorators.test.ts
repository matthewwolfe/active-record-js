import 'mocha';
import { expect } from 'chai';
import { model, relation } from 'model/decorators';
import Model from 'model/Model';
import models from 'model/stores/models';
import relations from 'model/stores/relations';


describe('Model decorators', () =>
{
    it('register a model to the store', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        expect(models.getModel('User')).to.equal(User);
    });

    it('register a relation to the store', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';

            @relation
            comments() {
                return this.hasMany('Comment', 'userId');
            }
        }

        const user = new User();

        expect(user.comments().constructor.name).to.equal('HasMany');
        expect(relations.isRelation('User', 'comments')).to.equal(true);
    });
})
