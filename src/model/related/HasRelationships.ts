import { BelongsTo, BelongsToMany, HasMany, HasOne } from 'query/relations';


export default class HasRelationships
{
    public belongsTo()
    {

    }

    public belongsToMany()
    {

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
