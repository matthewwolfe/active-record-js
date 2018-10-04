import ArrayCollection from 'collections/ArrayCollection';
import Collection from 'collections/Collection';
import MapCollection from 'collections/MapCollection';
import Model from 'model/Model';
import { model } from 'model/decorators';


describe('ArrayCollection', () =>
{
    test('constructor', () =>
    {
        const collection = new ArrayCollection([
            {id: 1, firstName: 'test', lastName: 'user'},
            {id: 2, firstName: 'test 2', lastName: 'user 2'}
        ], Collection);

        expect(collection instanceof ArrayCollection).toEqual(true);
        expect(collection[0].id).toEqual(1);
        expect(collection[1].id).toEqual(2);
    });

    test('length', () =>
    {
        const collection = new ArrayCollection([
            {id: 1, firstName: 'test', lastName: 'user'},
            {id: 2, firstName: 'test 2', lastName: 'user 2'}
        ], Collection);

        expect(collection.length).toEqual(2);
    });

    test('concat', () =>
    {
        const collection = new ArrayCollection([
            {id: 1, firstName: 'test', lastName: 'user'},
            {id: 2, firstName: 'test 2', lastName: 'user 2'}
        ], Collection);

        const newCollection = collection.concat({id: 3, firstName: 'test 3', lastName: 'user 3'});
        expect(newCollection.length).toEqual(3);
    });

    test('groupBy', () =>
    {
        const collection = new ArrayCollection([
            {id: 1, firstName: 'test', lastName: 'user'},
            {id: 2, firstName: 'test 2', lastName: 'user 2'}
        ], Collection);

        const usersById: any = collection.groupBy('id');

        expect(usersById.get(1).length).toEqual(1);
        expect(usersById.get(1)[0].id).toEqual(1);
    });

    test('keyBy', () =>
    {
        const collection = new ArrayCollection([
            {id: 1, firstName: 'test', lastName: 'user'},
            {id: 2, firstName: 'test 2', lastName: 'user 2'}
        ], Collection);

        const usersById: any = collection.keyBy('id');

        expect(usersById.get(1).id).toEqual(1);
        expect(usersById.get(2).id).toEqual(2);
    });

    test('pluck', () =>
    {
        const collection = new ArrayCollection([
            {id: 1, firstName: 'test', lastName: 'user'},
            {id: 2, firstName: 'test 2', lastName: 'user 2'}
        ], Collection);

        expect(collection.pluck('id')).toEqual([1, 2]);
    });

    test('toJSON', () =>
    {
        const collection = new ArrayCollection([
            {id: 1, firstName: 'test', lastName: 'user'},
            {id: 2, firstName: 'test 2', lastName: 'user 2'}
        ], Collection);

        const json = "[{\"id\":1,\"firstName\":\"test\",\"lastName\":\"user\"},{\"id\":2,\"firstName\":\"test 2\",\"lastName\":\"user 2\"}]";
        expect(JSON.stringify(collection)).toEqual(json);
    });

    test('toJSON - with models', () =>
    {
        @model
        class User extends Model
        {
            public static table = 'users';
        }

        const collection = new ArrayCollection([
            new User({id: 1, firstName: 'test', lastName: 'user'})
        ], Collection);

        expect(JSON.stringify(collection)).toEqual("[{\"id\":1,\"firstName\":\"test\",\"lastName\":\"user\"}]");
    });
});
