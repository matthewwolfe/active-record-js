import 'mocha';
import { expect } from 'chai';
import { model } from 'model/decorators';
import Model from 'model/Model';
import store from 'model/store';


describe('model - decorators', () =>
{
    it('register a model to the store', () =>
    {
        @model
        class User extends Model {

        }

        expect(store.getModel('User')).to.equal(User);
    });
})
