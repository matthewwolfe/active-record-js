import { BelongsTo, BelongsToMany, HasMany, HasOne } from 'query/relations';
import Builder from 'query/Builder';


export default class HasRelationships
{
    public belongsTo(related: string, foreignKey: string, localKey: string): Builder
    {
        return new BelongsTo(related, foreignKey, localKey).buildQuery();
    }

    public belongsToMany(related: string, pivot: string, foreignPivotKey: string, localPivotKey: string): Builder
    {
        return new BelongsToMany(related, pivot, foreignPivotKey, localPivotKey).buildQuery();
    }

    public hasMany(related: string, foreignKey: string, localKey: string = ''): Builder
    {
        return new HasMany(related, foreignKey, localKey).buildQuery();
    }

    public hasOne(related: string, foreignKey: string, localKey: string = ''): Builder
    {
        return new HasOne(related, foreignKey, localKey).buildQuery();
    }
}
