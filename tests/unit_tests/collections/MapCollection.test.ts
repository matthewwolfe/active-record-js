import MapCollection from 'collections/ArrayCollection';
import Collection from 'collections/Collection';
import Model from 'model/Model';
import { model } from 'model/decorators';


describe('MapCollection', () =>
{
    test('constructor', () =>
    {
        const collection = new MapCollection({
            1: {id: 1, firstName: 'test', lastName: 'user'},
            2: {id: 2, firstName: 'test 2', lastName: 'user 2'}
        }, Collection);

        expect(collection instanceof MapCollection).toEqual(true);
    });

    test('toJSON', () =>
    {
        const collection = new MapCollection({
            1: {id: 1, firstName: 'test', lastName: 'user'},
            2: {id: 2, firstName: 'test 2', lastName: 'user 2'}
        }, Collection);

        expect(JSON.stringify(collection)).toEqual(
            '{"1":{"id":1,"firstName":"test","lastName":"user"},"2":{"id":2,"firstName":"test 2","lastName":"user 2"}}'
        );
    });

    test('toJSON - with models', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const collection = new MapCollection({
            1: new User({id: 1, firstName: 'test', lastName: 'user'})
        }, Collection);

        expect(JSON.stringify(collection)).toEqual('{"1":{"id":1,"firstName":"test","lastName":"user"}}');
    });
});
