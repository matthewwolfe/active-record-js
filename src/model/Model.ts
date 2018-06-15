import { EventEmitter } from 'events';
import { ModelEvent } from 'model/constants';
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
    emitter: EventEmitter;
    hidden: Array<string> = [];
    timestamps: boolean = true;

    belongsTo: (related: string, foreignKey: string, localKey?: string) => any;
    belongsToMany: (related: string, pivot: string, foreignPivotKey?: string, localPivotKey?: string) => any;
    fireEvent: (event: ModelEvent) => void;
    fillAttributes: (attributes: object) => void;
    getAccessorProperty: (key: string|number) => any;
    getAttribute: (key: string|number) => any;
    getHidden: () => Array<string>;
    hasMany: (related: string, foreignKey: string, localKey?: string) => any;
    hasOne: (related: string, foreignKey: string, localKey?: string) => any;
    isAccessorProperty: (key: number|string) => boolean;
    isAttribute: (key: number|string) => boolean;
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

        return new Proxy(this, {
            get: (object, property: number|string) => {
                if (object.isAttribute(property)) {
                    return object.getAttribute(property);
                }

                return object[property];
            },
            set: (object, property: string, value) => {
                object.setAttribute(property, value);
                return true;
            }
        });
    }

    public applyRelations()
    {
        relations.getRelations(this.constructor.name).forEach(relation =>
            Object.defineProperty(this, `\$${relation}`, {
                get: () => this[relation]().get()
            })
        );
    }

    private newModelQuery(): Builder
    {
        return new Builder(this.constructor['table']);
    }

    private performInsert(query: Builder): Promise<boolean>
    {
        return query.insert(this.attributes);
    }

    private performUpdate(query: Builder): boolean
    {
        return true;
    }

    public async save(): Promise<boolean>
    {
        const query = this.newModelQuery();

        if (this.exists && this.isDirty())
        {
            return this.performUpdate(query);
        }
        else if (this.isDirty()) {
            return this.performInsert(query);
        }

        return true;
    }

    public static select(select: Array<string>): Builder
    {
        return new this().newModelQuery().select(select);
    }
}

applyMixins(Model, [HasAttributes, HasEvents, HasRelationships, HasTimestamps, HidesAttributes]);

export default Model;
