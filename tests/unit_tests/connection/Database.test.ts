jest.mock('mysql', () => require(`${process.cwd()}/tests/mocks/mysql`));

import Database from 'connection/Database';


describe('Database', () =>
{
    test('getName', () =>
    {
        const database = new Database({
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            port: 3306,
            database: 'TEST_DB',
            name: 'test-database'
        });
        expect(database.getName()).toEqual('test-database');
    });

    test('run', async () =>
    {
        require('mysql').setMockResults([
            {id: 1, firstName: 'test', lastName: 'user'},
            {id: 2, firstName: 'test', lastName: 'user2'}
        ]);

        const database = new Database({
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            port: 3306,
            database: 'TEST_DB',
            name: 'test-database'
        });
        const results = await database.run("SELECT id, firstName, lastName from users");

        expect(results.length).toEqual(2);
    });
});
