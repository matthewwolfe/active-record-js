import Emitter from 'emitter/Emitter';


describe('Emitter', () =>
{
    test('addListener', () =>
    {
        const fn = jest.fn();

        Emitter.addListener('test-event', fn);
        Emitter.emit('test-event');

        expect(fn).toBeCalled();
    });
});
