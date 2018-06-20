import 'mocha';
import { expect } from 'chai';
import DB from 'connection/DB';
import Schema from 'migrations/Schema';


describe('Schema', () =>
{
    it('createTable', async () =>
    {
        DB.create('127.0.0.1', 'root', 'password', 'TEST_DB', 'test-database');

        let success = await Schema.createTable('users', (table) => {
            table.integer('id', {allowNull: false, autoIncrement: true, signed: false, length: 15});
            table.varchar('email', {allowNull: false, length: 255});
            table.varchar('password', {allowNull: false, length: 60});
        });

        expect(success).to.equal(true);
        expect(await Schema.hasTable('users')).to.equal(true);

        success = await Schema.drop('users');
        expect(success).to.equal(true);
    });
});
