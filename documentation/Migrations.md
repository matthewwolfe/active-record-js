# Migrations

## Schema

#### createTable

| Parameter | Type     | Description                          |
| --------- | -------- | ------------------------------------ |
| table     | string   | Name of table to create              |
| fn        | Function | Function containing blueprint object |

```ts
await Schema.createTable('users', (blueprint) =>
{
    blueprint.integer('id', {allowNull: false, length: 15, signed: false});
    blueprint.varchar('firstName', {length: 255});
});
```

#### drop

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| table     | string   | Name of table to drop |

```ts
await Schema.drop('users');
```

#### dropIfExists

| Parameter | Type     | Description                        |
| --------- | -------- | ---------------------------------- |
| table     | string   | Name of table to drop if it exists |

```ts
await Schema.dropIfExists('users');
```

#### hasColumn

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| table     | string   | Name of table  |
| column    | string   | Name of column |

```ts
await Schema.hasColumn('users', 'id');
```

#### hasTable

| Parameter | Type     | Description   |
| --------- | -------- | ------------- |
| table     | string   | Name of table |

```ts
await Schema.hasTable('users');
```

## Blueprint

#### bigInteger

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| name      | string   | Column name    |
| options   | object   | Column options |

```ts
blueprint.bigInteger('id', {allowNull: false, length: 15, signed: false});
```

#### blob

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| name      | string   | Column name |

```ts
blueprint.blob('binaryData');
```

#### char

```ts
blueprint.char('char');
```

#### date

```ts
blueprint.date('startDate');
```

#### dateTime

```ts
blueprint.dateTime('startDateTime');
```

#### decimal

```ts
blueprint.decimal('decimalColumn', {allowNull: false});
```

#### double

```ts
blueprint.double('numberColumn', {length: 15});
```

#### enum

```ts
blueprint.enum('status', {
    values: ['pending', 'succeeded', 'failed'],
    defaultValue: null
});
```

#### float

```ts
blueprint.float('floatColumn');
```

#### integer

```ts
blueprint.integer('id', {length: 15});
```

#### longText

```ts
blueprint.longText('description');
```

#### mediumInteger

```ts
blueprint.mediumInteger('id');
```

#### mediumText

```ts
blueprint.mediumText('shortDescription');
```

#### smallInteger

```ts
blueprint.smallInteger('quantity');
```

#### text

```ts
blueprint.text('description');
```

#### time

```ts
blueprint.time('startTime');
```

#### timestamp

```ts
blueprint.timestamp('createdAt');
```

#### tinyInteger

```ts
blueprint.tinyInteger('active');
```

#### varchar

```ts
blueprint.varchar('username');
```

#### year

```ts
blueprint.year('startYear');
```
