import 'mocha';
import { expect } from 'chai';
import Builder from 'query/Builder';


describe('Builder', () =>
{
    it('distinct', () =>
    {
        const builder = new Builder('users');
        expect(builder.isDistinct).to.equal(false);

        builder.distinct();
        expect(builder.isDistinct).to.equal(true);
    });

    it('limit', () =>
    {
        const builder = new Builder('users');
        builder.limit(10);
        expect(builder.limits).to.equal(10);
    });

    it('offset', () =>
    {
        const builder = new Builder('users');
        builder.offset(10);
        expect(builder.offsets).to.equal(10);
    });

    it('select "from".* by default', () =>
    {
        const builder = new Builder('users');
        expect(builder.selects.length).to.equal(1);
        expect(builder.selects[0]).to.equal('users.*');
    });
})
