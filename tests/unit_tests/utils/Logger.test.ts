import { Logger } from 'utils/Logger';


describe('Logger', () =>
{
    test('clear / getLogs / log', () =>
    {
        const logger = new Logger();
        logger.log('test');

        expect(logger.getLogs().length).toEqual(1);
        expect(logger.getLogs()[0]).toEqual('test');

        logger.clear();
        expect(logger.getLogs().length).toEqual(0);
    });
});
