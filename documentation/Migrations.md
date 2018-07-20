# Migrations

## Schema

#### createTable

```ts
await Schema.createTable('users', (blueprint) =>
{
    blueprint.integer('id', {allowNull: false, length: 15, signed: false});
    blueprint.varchar('firstName', {length: 255});
});
```

#### drop

```ts
await Schema.drop('users');
```

#### dropIfExists

```ts
await Schema.dropIfExists('users');
```

#### hasColumn

```ts
await Schema.hasColumn('users', 'id');
```

#### hasTable

```ts
await Schema.hasTable('users');
```

## Blueprint
