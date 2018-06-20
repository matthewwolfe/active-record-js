import HasAttributes from 'model/related/HasAttributes';


describe('HasAttributes', () =>
{
    test('fill attributes', () =>
    {
        const attributes = {
            id: 1,
            name: 'test'
        };
        const instance = new HasAttributes();
        instance.fillAttributes(attributes);

        expect(instance.getAttribute('id')).toEqual(attributes.id);
        expect(instance.getAttribute('name')).toEqual(attributes.name);
    });

    test('get attribute', () =>
    {
        const attributes = {
            id: 1,
            name: 'test'
        };

        const instance = new HasAttributes();
        instance.fillAttributes(attributes);

        expect(instance.getAttribute('id')).toEqual(1);
        expect(instance.getAttribute('name')).toEqual('test');
    });

    test('is attribute', () =>
    {
        const attributes = {
            id: 1,
            name: 'test'
        };

        const instance = new HasAttributes();
        instance.fillAttributes(attributes);

        expect(instance.isAttribute('id')).toEqual(true);
        expect(instance.isAttribute('random-attribute')).toEqual(false);
    });

    test('set attribute', () => {
        const id = 1;

        const instance = new HasAttributes();
        instance.setAttribute('id', id);

        expect(instance.getAttribute('id')).toEqual(id);
    });
});
