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

## Joins
