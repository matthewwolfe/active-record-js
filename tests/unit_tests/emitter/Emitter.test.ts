import Emitter from 'emitter/Emitter';
import ModelCreated from 'emitter/events/ModelCreated';


describe('Emitter', () =>
{
    test('addListener', () =>
    {
        const fn = jest.fn();
        const event = new ModelCreated(null);

        Emitter.addListener(event.type, fn);
        Emitter.emit(event);

        expect(fn).toBeCalled();
    });
});
