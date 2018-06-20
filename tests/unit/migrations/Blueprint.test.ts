import 'mocha';
import { expect } from 'chai';
import Blueprint from 'migrations/Blueprint';


describe('Blueprint', () =>
{
    it('columns', () =>
    {
        const blueprint = new Blueprint('users');
        blueprint.integer('id', {allowNull: false, length: 15, signed: false});
        blueprint.varchar('firstName', {length: 255});

        expect(blueprint.compile()).to.equal(
            "CREATE TABLE `users` ( `id` INT (15) UNSIGNED NOT NULL, `firstName` VARCHAR (255) NULL , PRIMARY KEY ( `id` ) ) DEFAULT CHARSET utf8 COLLATE utf8_unicode_ci"
        );
    });
});
