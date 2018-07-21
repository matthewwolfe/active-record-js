import Order from 'query/expressions/Order';


describe('Order', () =>
{
    test('toString', () =>
    {
        const order = new Order('id', 'desc');
        expect(order.toString()).toEqual('`id` DESC');
    });
});
