import HidesAttributes from 'model/related/HidesAttributes';


describe('HidesAttributes', () =>
{
    test('get/set hidden', () =>
    {
        const hidden = ['password'];

        const instance = new HidesAttributes();
        instance.setHidden(hidden);

        expect(instance.getHidden().length).toEqual(1);
        expect(instance.getHidden()[0]).toEqual(hidden[0]);
    });
});
