import DB from 'connection/DB';


describe('DB', () =>
{
    test('create', () =>
    {
        DB.create({
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            port: 3306,
            database: 'TEST_DB',
            name: 'test-database'
        });
        expect(DB.getActiveDatabase().getName()).toEqual('test-database');
    });
});
