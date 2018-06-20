import Join from 'query/expressions/Join';


describe('Join', () =>
{
    test('toString', () =>
    {
        const join = new Join('posts', 'users.id', '=', 'posts.userId');
        expect(join.toString()).toEqual('JOIN `posts` ON `users`.`id` = `posts`.`userId`');
    });
});
