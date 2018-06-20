import 'mocha';
import { expect } from 'chai';
import HidesAttributes from 'model/related/HidesAttributes';


describe('HidesAttributes', () =>
{
    it('get/set hidden', () =>
    {
        const hidden = ['password'];

        const instance = new HidesAttributes();
        instance.setHidden(hidden);

        expect(instance.getHidden().length).to.equal(1);
        expect(instance.getHidden()[0]).to.equal(hidden[0]);
    });
});
