import 'mocha';
import { expect } from 'chai';
import Order from 'query/expressions/Order';


describe('Order', () =>
{
    it('toString', () =>
    {
        const order = new Order('id', 'desc');
        expect(order.toString()).to.equal('`id` `DESC`');
    });
});
