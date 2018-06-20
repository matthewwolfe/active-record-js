import 'mocha';
import { expect } from 'chai';
import Join from 'query/expressions/Join';


describe('Join', () =>
{
    it('toString', () =>
    {
        const join = new Join('posts', 'users.id', '=', 'posts.userId');
        expect(join.toString()).to.equal('JOIN `posts` ON `users`.`id` = `posts`.`userId`');
    });
});
