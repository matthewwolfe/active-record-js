# Relationships

## Defining Relationships

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
    public users()
    {
        return this.belongsToMany('User', 'userGroups', 'groupId', 'userId');
    }
}

const users: Array<User> = await group.users().get();
```
