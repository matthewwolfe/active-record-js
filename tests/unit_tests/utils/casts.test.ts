import { casts } from 'utils/casts';


describe('casts', () =>
{
    test('boolean', () =>
    {
        expect(casts.boolean(0)).toEqual(false);
        expect(casts.boolean('false')).toEqual(false);
        expect(casts.boolean('test test test')).toEqual(null);
    });

    test('object', () =>
    {
        expect(casts.object('{"id": 1, "name": "test"}')).toEqual({
            id: 1,
            name: 'test'
        });
    });
});
