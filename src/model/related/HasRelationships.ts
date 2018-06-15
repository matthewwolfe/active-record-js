import { BelongsTo, BelongsToMany, HasMany, HasOne } from 'query/relations';


export default class HasRelationships
{
    public belongsTo(related: string, foreignKey: string, localKey: string)
    {
        return new BelongsTo(related, foreignKey, localKey);
    }

    public belongsToMany(related: string, pivot: string, foreignPivotKey: string, localPivotKey: string)
    {
        return new BelongsToMany(related, pivot, foreignPivotKey, localPivotKey);
    }

    public hasMany(related: string, foreignKey: string, localKey: string = '')
    {
        return new HasMany(related, foreignKey, localKey);
    }

    public hasOne(related: string, foreignKey: string, localKey: string = '')
    {
        return new HasOne(related, foreignKey, localKey);
    }
}
