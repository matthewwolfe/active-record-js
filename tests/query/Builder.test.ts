import 'mocha';
import { expect } from 'chai';
import Builder from 'query/Builder';


describe('Builder', () =>
{
    it('distinct', () =>
    {
        const query = new Builder('users');
        expect(query.isDistinct).to.equal(false);

        query.distinct();
        expect(query.isDistinct).to.equal(true);
    });

    it('limit', () =>
    {
        const query = new Builder('users');
        query.limit(10);
        expect(query.limits).to.equal(10);
    });

    it('offset', () =>
    {
        const query = new Builder('users');
        query.offset(10);
        expect(query.offsets).to.equal(10);
    });

    it('select "from".* by default', () =>
    {
        const query = new Builder('users');
        expect(query.selects.length).to.equal(1);
        expect(query.selects[0]).to.equal('users.*');
    });

    it('toSql', () =>
    {
        const query = new Builder('users');
        expect(query.toSql()).to.equal("SELECT `users`.`*` FROM `users`");
    });
});
