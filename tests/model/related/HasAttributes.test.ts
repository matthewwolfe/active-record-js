import 'mocha';
import { expect } from 'chai';
import HasAttributes from 'model/related/HasAttributes';


describe('HasAttributes', () =>
{
    it('fill attributes', () =>
    {
        const attributes = {
            id: 1,
            name: 'test'
        };
        const instance = new HasAttributes();
        instance.fillAttributes(attributes);

        expect(instance.getAttribute('id')).to.equal(attributes.id);
        expect(instance.getAttribute('name')).to.equal(attributes.name);
    });

    it('get attribute', () =>
    {
        const attributes = {
            id: 1,
            name: 'test'
        };

        const instance = new HasAttributes();
        instance.fillAttributes(attributes);

        expect(instance.getAttribute('id')).to.equal(1);
        expect(instance.getAttribute('name')).to.equal('test');
    });

    it('is attribute', () =>
    {
        const attributes = {
            id: 1,
            name: 'test'
        };

        const instance = new HasAttributes();
        instance.fillAttributes(attributes);

        expect(instance.isAttribute('id')).to.equal(true);
        expect(instance.isAttribute('random-attribute')).to.equal(false);
    });

    it('set attribute', () => {
        const id = 1;

        const instance = new HasAttributes();
        instance.setAttribute('id', id);

        expect(instance.getAttribute('id')).to.equal(id);
    });
});
