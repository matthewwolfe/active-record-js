import DB from 'connection/DB';


describe('DB', () =>
{
    test('create', () =>
    {
        DB.create('127.0.0.1', 'root', 'password', 'TEST_DB', 'test-database');
        expect(DB.getActiveDatabase().getName()).toEqual('test-database');
    });
});
