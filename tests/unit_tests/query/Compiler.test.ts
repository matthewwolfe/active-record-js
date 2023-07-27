import Builder from 'query/Builder';
import Compiler from 'query/Compiler';


describe('Compiler', () =>
{
    test('compileDelete', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');

        expect(compiler.compileDelete(query)).toEqual("DELETE FROM `users`");
    });

    test('compileDelete - wheres', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('user');
        query.where('id', '=', 1);

        expect(compiler.compileDelete(query)).toEqual("DELETE FROM `user` WHERE `id` = 1");
    });

    test('compileInsert', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');
        const date = new Date('2018-01-01 15:00:00');

        const sql = compiler.compileInsert(query, [{id: 1, createdAt: date}]);
        expect(sql).toEqual("INSERT INTO `users` ( `id`, `createdAt` ) VALUES ( 1, '2018-01-01 15:00:00.000' )");
    });

    test('compileInsert - multiple rows', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');

        const sql = compiler.compileInsert(
            query,
            [{id: 1}, {id: 2}]
        );

        expect(sql).toEqual("INSERT INTO `users` ( `id` ) VALUES ( 1 ), ( 2 )")
    })

    test('compileSelect - default select', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');

        expect(compiler.compileSelect(query)).toEqual("SELECT `users`.`*` FROM `users`");
    });

    test('compileSelect - count', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');

        expect(compiler.compileSelect(query, true)).toEqual("SELECT COUNT(*) as count FROM `users`");
    });

    test('compileSelect - distinct', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');
        query.distinct();

        expect(compiler.compileSelect(query)).toEqual("SELECT DISTINCT `users`.`*` FROM `users`");
    });

    test('compileSelect - groupBy', () =>
    {
        const sql = "SELECT `users`.`*` FROM `users` GROUP BY roleId, accountId";
        const compiler = new Compiler();
        const query = new Builder().from('users');
        query.groupBy(['roleId', 'accountId']);

        expect(compiler.compileSelect(query)).toEqual(sql);
    });

    test('compileSelect - join', () =>
    {
        const sql = "SELECT `users`.`*` FROM `users` JOIN `comments` ON `users`.`id` = `comments`.`userId`";
        const compiler = new Compiler();
        const query = new Builder().from('users');
        query.join('comments', 'users.id', '=', 'comments.userId');

        expect(compiler.compileSelect(query)).toEqual(sql);
    });

    test('compileSelect - leftJoin', () =>
    {
        const sql = "SELECT `users`.`*` FROM `users` LEFT JOIN `comments` ON `users`.`id` = `comments`.`userId`";
        const compiler = new Compiler();
        const query = new Builder().from('users');
        query.leftJoin('comments', 'users.id', '=', 'comments.userId');

        expect(compiler.compileSelect(query)).toEqual(sql);
    });

    test('compileSelect - limit', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');
        query.limit(10);

        expect(compiler.compileSelect(query)).toEqual("SELECT `users`.`*` FROM `users` LIMIT 10");
    });

    test('compileSelect - limit/offset', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');
        query.limit(10).offset(10);

        expect(compiler.compileSelect(query)).toEqual("SELECT `users`.`*` FROM `users` LIMIT 10 OFFSET 10");
    });

    test('compileSelect - orderBy', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');

        query.orderBy('id', 'desc');
        expect(compiler.compileSelect(query)).toEqual("SELECT `users`.`*` FROM `users` ORDER BY `id` DESC");

        query.orderBy('firstName');
        expect(compiler.compileSelect(query)).toEqual(
            "SELECT `users`.`*` FROM `users` ORDER BY `id` DESC, `firstName` ASC"
        );
    });

    test('compileSelect - orWhere', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');

        query.where('id', '=', 1);
        query.orWhere('id', '=', 2);

        expect(compiler.compileSelect(query)).toEqual(
            "SELECT `users`.`*` FROM `users` WHERE `id` = 1 OR `id` = 2"
        );
    });

    test('compileSelect - rightJoin', () =>
    {
        const sql = "SELECT `users`.`*` FROM `users` RIGHT JOIN `comments` ON `users`.`id` = `comments`.`userId`";
        const compiler = new Compiler();
        const query = new Builder().from('users');
        query.rightJoin('comments', 'users.id', '=', 'comments.userId');

        expect(compiler.compileSelect(query)).toEqual(sql);
    });

    test('compileSelect - select', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');
        query.select(['id', 'firstName', 'lastName']);


        expect(compiler.compileSelect(query)).toEqual("SELECT `id`, `firstName`, `lastName` FROM `users`");
    });

    test('compileSelect - where', () =>
    {
        const sql = "SELECT `users`.`*` FROM `users` WHERE `firstName` = 'test' AND `lastName` = 'user'";
        const compiler = new Compiler();
        const query = new Builder().from('users');

        query.where('firstName', '=', 'test');
        query.where('lastName', '=', 'user');

        expect(compiler.compileSelect(query)).toEqual(sql);
    });

    test('compileSelect - whereIn', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');

        query.whereIn('id', [1, 2, 3]);

        expect(compiler.compileSelect(query)).toEqual("SELECT `users`.`*` FROM `users` WHERE `id` IN (1, 2, 3)");
    });

    test('compileUpdate', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');
        const updates = {active: 0, createdAt: new Date('2018-01-01 15:00:00')};

        expect(compiler.compileUpdate(query, updates)).toEqual("UPDATE `users` SET `active` = 0, `createdAt` = '2018-01-01 15:00:00.000'");
    });

    test('compileUpdate - where', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');
        const updates = {active: 0};
        query.where('firstName', '=', 'test');

        expect(compiler.compileUpdate(query, updates)).toEqual("UPDATE `users` SET `active` = 0 WHERE `firstName` = 'test'");
    });

    test('compileUpdate - whereIn', () =>
    {
        const compiler = new Compiler();
        const query = new Builder().from('users');
        const updates = {active: 0};
        query.whereIn('id', [1, 2, 3]);

        expect(compiler.compileUpdate(query, updates)).toEqual("UPDATE `users` SET `active` = 0 WHERE `id` IN (1, 2, 3)");
    });
});
