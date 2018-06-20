import Database from 'connection/Database';


describe('Database', () =>
{
    test('getName', () =>
    {
        const database = new Database('127.0.0.1', 'root', 'password', 'TEST_DB', 'test-database');
        expect(database.getName()).toEqual('test-database');
    });
});
