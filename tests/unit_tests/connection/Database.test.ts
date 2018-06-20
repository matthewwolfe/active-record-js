jest.mock('mysql', () => require(`${process.cwd()}/tests/mocks/mysql`));

import Database from 'connection/Database';


describe('Database', () =>
{
    test('getName', () =>
    {
        const database = new Database('127.0.0.1', 'root', 'password', 'TEST_DB', 'test-database');
        expect(database.getName()).toEqual('test-database');
    });

    test('run', async () =>
    {
        require('mysql').setMockResults([
            {id: 1, firstName: 'test', lastName: 'user'},
            {id: 2, firstName: 'test', lastName: 'user2'}
        ]);

        const database = new Database('127.0.0.1', 'root', 'password', 'TEST_DB', 'test-database');
        const results = await database.run("SELECT id, firstName, lastName from users");

        expect(results.length).toEqual(2);
    });
});
