import { ModelEvent } from 'model/constants';
import HasEvents from 'model/related/HasEvents';


describe('HasEvents', () =>
{
    test('fireEvent', () =>
    {
        const hasEvents = new HasEvents();
        const fn = jest.fn();

        hasEvents.addListener(ModelEvent.Saved, fn);
        hasEvents.fireEvent(ModelEvent.Saved);

        expect(fn).toBeCalled();
    });
});
