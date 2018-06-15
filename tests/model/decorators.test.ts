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

        const user = new User();

        expect(user.setting().constructor.name).to.equal('HasOne');
        expect(relations.isRelation('User', 'setting')).to.equal(true);

        expect(user.comments().constructor.name).to.equal('HasMany');
        expect(relations.isRelation('User', 'comments')).to.equal(true);

        expect(user.client().constructor.name).to.equal('BelongsTo');
        expect(relations.isRelation('User', 'client')).to.equal(true);

        expect(user.roles().constructor.name).to.equal('BelongsToMany');
        expect(relations.isRelation('User', 'roles')).to.equal(true);
    });
})
