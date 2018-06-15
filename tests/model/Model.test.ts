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

    it('get an attribute', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const user = new User({id: 1});
        expect(user.id).to.equal(1);
    });

    it('get an accessor', () =>
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

        expect(user.fullName).to.equal(`${user.firstName} ${user.lastName}`);
    });

    it('get an attribute with a mutator', () =>
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

        expect(user.firstName).to.equal('TEST');

        user.firstName = 'new name';
        expect(user.firstName).to.equal('NEW NAME');
    });

    it('set an attribute', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const user = new User();
        user.id = 1;

        expect(user.id).to.equal(1);
    });

    it('save', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const user = new User({
            id: 1,
            firstName: 'test',
            lastName: 'user'
        });

        user.save();
    });
});
