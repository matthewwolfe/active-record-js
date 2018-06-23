# Relationships

## Defining Relationships

#### relation - decorator

The ```relation``` decorator registers the relationship for the model class so that it can be accessible as a getter
and a method. Relationship getters should be prefixed with a ```$```. See below: Eager Loading

#### One To One

```typescript
@model
class User extends Model
{
    public account()
    {
        return this.hasOne('Account', 'userId');
    }
}

const account = await user.account().get();
```

###### Inverse Relationship

```typescript
@model
class Account extends Model
{
    @relation
    public user()
    {
        return this.belongsTo('User', 'userId');
    }
}

const user: User = await account.user().get();
```

#### One To Many

```typescript
@model
class User extends Model
{
    @relation
    public comments()
    {
        return this.hasMany('Comment', 'userId');
    }
}

const comments: Array<User> = await user.comments().get();
```

###### Inverse Relationship

```typescript
@model
class Comment extends Model
{
    @relation
    public user()
    {
        return this.belongsTo('User', 'userId');
    }
}

const user: User = await comment.user().get();
```

#### Many To Many

```typescript
@model
class Group extends Model
{
    @relation
    public users()
    {
        return this.belongsToMany('User', 'userGroups', 'groupId', 'userId');
    }
}

const users: Array<User> = await group.users().get();
```

## Eager Loading

A relationship can be accessed as a property when prefixed with a ```$```. This allows for chaining together many
relationships.

```typescript
@model
class User extends Model
{
    @relation
    public account()
    {
        return this.hasOne('Account', 'userId');
    }
}

const account = await user.$account;
```
