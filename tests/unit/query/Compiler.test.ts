import 'mocha';
import { expect } from 'chai';
import Builder from 'query/Builder';
import Compiler from 'query/Compiler';


describe('Compiler', () =>
{
    it('compileSelect - default select', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');

        expect(compiler.compileSelect(query)).to.equal('SELECT `users`.`*` FROM `users`');
    });

    it('compileSelect - distinct', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');
        query.distinct();

        expect(compiler.compileSelect(query)).to.equal("SELECT DISTINCT `users`.`*` FROM `users`");
    });

    it('compileSelect - join', () =>
    {
        const sql = "SELECT `users`.`*` FROM `users` JOIN `comments` ON `users`.`id` = `comments`.`userId`";
        const compiler = new Compiler();
        const query = new Builder('users');
        query.join('comments', 'users.id', '=', 'comments.userId');

        expect(compiler.compileSelect(query)).to.equal(sql);
    });

    it('compileSelect - limit', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');
        query.limit(10);

        expect(compiler.compileSelect(query)).to.equal("SELECT `users`.`*` FROM `users` LIMIT 10");
    });

    it('compileSelect - limit/offset', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');
        query.limit(10).offset(10);

        expect(compiler.compileSelect(query)).to.equal("SELECT `users`.`*` FROM `users` LIMIT 10 OFFSET 10");
    });

    it('compileSelect - orderBy', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');

        query.orderBy('id', 'desc');
        expect(compiler.compileSelect(query)).to.equal("SELECT `users`.`*` FROM `users` ORDER BY `id` `DESC`");

        query.orderBy('firstName');
        expect(compiler.compileSelect(query)).to.equal(
            "SELECT `users`.`*` FROM `users` ORDER BY `id` `DESC`, `firstName` `ASC`"
        );
    });

    it('compileSelect - select', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');
        query.select(['id', 'firstName', 'lastName']);


        expect(compiler.compileSelect(query)).to.equal("SELECT `id`, `firstName`, `lastName` FROM `users`");
    });

    it('compileSelect - where', () =>
    {
        const sql = "SELECT `users`.`*` FROM `users` WHERE `firstName` = 'test' AND `lastName` = 'user'";
        const compiler = new Compiler();
        const query = new Builder('users');

        query.where('firstName', '=', 'test');
        query.where('lastName', '=', 'user');

        expect(compiler.compileSelect(query)).to.equal(sql);
    });

    it('compileSelect - whereIn', () =>
    {
        const compiler = new Compiler();
        const query = new Builder('users');

        query.whereIn('id', [1, 2, 3]);

        expect(compiler.compileSelect(query)).to.equal("SELECT `users`.`*` FROM `users` WHERE `id` IN (1, 2, 3)");
    });
});
