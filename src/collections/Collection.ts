import ArrayCollection from './ArrayCollection';
import MapCollection from './MapCollection';


export default class Collection
{
    public static initialize(data: Array<any>|object): any
    {
        if (Array.isArray(data)) {
            return new ArrayCollection(data, Collection);
        }
        else if (typeof data === 'object' && data !== null) {
            return new MapCollection(data, Collection);
        }
    }
}
