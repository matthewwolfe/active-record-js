import { HasAttributes, HasEvents, HasRelationships, HasTimestamps, HidesAttributes } from 'model/related';
import relations from 'model/stores/relations';
import { Builder } from 'query';
import { applyMixins } from 'utils/mixins';


interface ProxyType {
    [name: string]: any;
}

class Model implements HasAttributes, HasEvents, HasRelationships, HasTimestamps, HidesAttributes, ProxyType
{
    // Allow any property since relations are added on initialization
    [property: string]: any;

    // Mixin type definitions

    CREATED_AT: string = 'createdAt';
    UPDATED_AT: string = 'updatedAt';

    attributes: object = {};
    appends: Array<string> = [];
    casts: object = {};
    changedAttributes: Array<string> = [];
    hidden: Array<string> = [];
    timestamps: boolean = true;

    belongsTo: () => void;
    belongsToMany: () => void;
    fillAttributes: (attributes: object) => void;
    getAttribute: (key: string|number|symbol) => any;
    getHidden: () => Array<string>;
    hasMany: (related: string, foreignKey: string, localKey?: string) => any;
    hasOne: (related: string, foreignKey: string, localKey?: string) => any;
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
        this.applyRelations();
    }

    public applyRelations()
    {
        relations.getRelations(this.constructor.name).forEach(relation =>
            Object.defineProperty(this, `\$${relation}`, {
                get: () => this[relation]().get()
            })
        );
    }

    public static select(select: Array<string>): Builder
    {
        return new Builder(this.table).select(select);
    }
}

applyMixins(Model, [HasAttributes, HasEvents, HasRelationships, HasTimestamps, HidesAttributes]);

export default Model;
