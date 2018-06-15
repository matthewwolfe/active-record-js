# Model

## Import

```js
import { Model, model } from 'active-record';
```

## Descriptions

#### Model

The base model that corresponds to a database table.

#### model - decorator

The model decorator registers a model class internally to a store of models.
The purpose of the store is to locate other models for relationships, without
having to import them directly, or deal with circular dependencies.

## Model Definition

```js
// Add the model to the model store - required
@model
class User extends Model
{
    public static table = 'users';

    comments()
    {
        return this.hasMany('Comment', 'userId');
    }

    get fullNameAttribute()
    {
        return `${this.firstName} ${this.lastName}`;
    }
}

export default User;
```

## Model Usage

```js
// Retrieve a user by id
const user = await User.findById(1);

// Get the user's full name
const fullName = user.fullName;

// Retrieve all the comments that this user has
const comments = await user.comments().get();
```
