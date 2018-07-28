# Query Builder

## Description

The Query Builder class a wrapper around SQL, used to build queries by chaining method calls. Queries can be built
from Models, Relations, or using the DB class.

## Select

#### Specific Columns

By default, the query builder will select all columns from the specified ```from``` table. This can be overwritten
by selecting specific columns.

```typescript
// Retrieve the id, firstName, and lastName columns from the users table
User.select(['id', 'firstName', 'lastName']).get();
```

#### Adding Columns

Columns can also be added conditionally.

```typescript
const query = User.select(['id']);

if (someCondition) {
    query.addSelect(['firstName']);
}
```

#### Raw

Inserting a raw expression into the select statement of a query is easy using the ```selectRaw``` method.

```typescript
Product.selectRaw('price * ? as tax', [0.05]);
```

#### Distinct

```typescript
const query = await User.select(['age']).distinct().get();
```

#### First

```typescript
const user = await User.select(['id']).first();
```

#### Get

```typescript
const users = await User.select(['*']).get();
```

#### Joins

```typescript
const query = User.select(['id']);
query.join('comments', 'users.id', '=', 'comments.userId');
```

#### Limit

```typescript
const users = await User.select(['id']).limit(5).get();
```

#### Offset

```typescript
const users = await User.select(['id']).offset(5).get();
```

#### Order By

```typescript
const users = await User.select(['id']).orderBy('createdAt', 'desc').get();
```

#### Paginate

See: [Pagination](Pagination.md)

#### Where

```typescript
const users = await User.where('active', '=', true).get();
```

#### Where In

```typescript
const users = await User.whereIn('id', [1, 2, 3, 4, 5]).get();
```

#### Update

```typescript
await User.where('lockouts', '>', 5).update({banned: true});
```
