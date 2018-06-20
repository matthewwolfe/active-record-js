import 'mocha';
import { expect } from 'chai';
import DB from 'connection/DB';


describe('DB', () =>
{
    it('create', () =>
    {
        DB.create('127.0.0.1', 'root', 'password', 'TEST_DB', 'test-database');
        expect(DB.getActiveDatabase().getName()).to.equal('test-database');
    });
});
