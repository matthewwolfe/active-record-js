# Pagination

#### Query paginate

```typescript
@model
class Comment extends Model
{
    public static table = 'comments';
}

@model
class User extends Model
{
    public static table = 'users';

    @relation
    comments()
    {
        return this.hasMany('Comment', 'userId');
    }
}

const user: User = await User.findById(1);
const pagination: PaginationObject = await user.comments().paginate({limit: 10, page: 1});
```

#### PaginationOptions

- ```limit: number```
- ```page: number```

#### PaginateObject

- ```count: number```
- ```page: number```
- ```lastPage: number```
- ```data: ArrayCollection```
