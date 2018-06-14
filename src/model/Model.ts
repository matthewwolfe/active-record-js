import { HasAttributes, HasEvents, HasRelationships, HasTimestamps, HidesAttributes } from 'model/related';
import { Builder } from 'query';
import { applyMixins } from 'utils/mixins';


class Model implements HasAttributes, HasEvents, HasRelationships, HasTimestamps, HidesAttributes
{
    // Mixin type definitions

    CREATED_AT: string = 'createdAt';
    UPDATED_AT: string = 'updatedAt';

    attributes: object = {};
    appends: Array<string> = [];
    casts: object = {};
    changedAttributes: Array<string> = [];
    hidden: Array<string> = [];
    relations: object = {};
    timestamps: boolean = true;

    belongsTo: () => void;
    belongsToMany: () => void;
    fillAttributes: (attributes: object) => void;
    getAttribute: (key: string) => any;
    getHidden: () => Array<string>;
    hasMany: () => void;
    hasOne: () => void;
    isDirty: () => boolean;
    setAttribute: (key: string, value: any) => void;
    setCreatedAt: (timestamp: string) => any;
    setHidden: (keys: Array<string>) => void;
    setUpdatedAt: (timestamp: string) => any;

    // End mixin type definitions

    public static table: string = '';

    protected exists: boolean = false;
    protected incrementing: boolean = true;
    protected primaryKey: string = 'id';

    constructor(attributes: object = {})
    {
        this.fillAttributes(attributes);
    }

    public static select(select: Array<string>): Builder
    {
        return new Builder(this.table).select(select);
    }
}

applyMixins(Model, [HasAttributes, HasEvents, HasRelationships, HasTimestamps, HidesAttributes]);

export default Model;
