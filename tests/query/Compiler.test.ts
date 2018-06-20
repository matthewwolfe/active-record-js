import Builder from 'query/Builder';
import Compiler from 'query/Compiler';


describe('Compiler', () =>
{
    test('compileSelect - default select', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');

        expect(compiler.compileSelect(query)).toEqual('SELECT `users`.`*` FROM `users`');
    });

    test('compileSelect - distinct', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');
        query.distinct();

        expect(compiler.compileSelect(query)).toEqual("SELECT DISTINCT `users`.`*` FROM `users`");
    });

    test('compileSelect - join', () =>
    {
        const sql = "SELECT `users`.`*` FROM `users` JOIN `comments` ON `users`.`id` = `comments`.`userId`";
        const compiler = new Compiler();
        const query = new Builder('users');
        query.join('comments', 'users.id', '=', 'comments.userId');

        expect(compiler.compileSelect(query)).toEqual(sql);
    });

    test('compileSelect - limit', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');
        query.limit(10);

        expect(compiler.compileSelect(query)).toEqual("SELECT `users`.`*` FROM `users` LIMIT 10");
    });

    test('compileSelect - limit/offset', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');
        query.limit(10).offset(10);

        expect(compiler.compileSelect(query)).toEqual("SELECT `users`.`*` FROM `users` LIMIT 10 OFFSET 10");
    });

    test('compileSelect - orderBy', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');

        query.orderBy('id', 'desc');
        expect(compiler.compileSelect(query)).toEqual("SELECT `users`.`*` FROM `users` ORDER BY `id` `DESC`");

        query.orderBy('firstName');
        expect(compiler.compileSelect(query)).toEqual(
            "SELECT `users`.`*` FROM `users` ORDER BY `id` `DESC`, `firstName` `ASC`"
        );
    });

    test('compileSelect - select', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');
        query.select(['id', 'firstName', 'lastName']);


        expect(compiler.compileSelect(query)).toEqual("SELECT `id`, `firstName`, `lastName` FROM `users`");
    });

    test('compileSelect - where', () =>
    {
        const sql = "SELECT `users`.`*` FROM `users` WHERE `firstName` = 'test' AND `lastName` = 'user'";
        const compiler = new Compiler();
        const query = new Builder('users');

        query.where('firstName', '=', 'test');
        query.where('lastName', '=', 'user');

        expect(compiler.compileSelect(query)).toEqual(sql);
    });

    test('compileSelect - whereIn', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');

        query.whereIn('id', [1, 2, 3]);

        expect(compiler.compileSelect(query)).toEqual("SELECT `users`.`*` FROM `users` WHERE `id` IN (1, 2, 3)");
    });
});
