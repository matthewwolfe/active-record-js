import 'mocha';
import { expect } from 'chai';
import Database from 'connection/Database';


describe('Database', () =>
{
    it('getName', () =>
    {
        const database = new Database('127.0.0.1', 'root', 'password', 'TEST_DB', 'test-database');
        expect(database.getName()).to.equal('test-database');
    });
});
